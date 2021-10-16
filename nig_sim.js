const D = (value) => new Decimal(value);
const numarr2boolarr = (numarr, length) => {
    let boolarr = new Array(length).fill(false);
    numarr.forEach((n, i) => {
        if (typeof n == 'boolean') {
            boolarr[i] = n;
        } else {
            boolarr[n] = true;
        }
    });
    return boolarr;
};

class Nig {
    constructor() {
        const initialData = () => {
            return {
                money: D(1),
                level: D(0),
                levelresettime: D(0),
                maxlevelgained: D(1),
                token: 0,
                shine: 0,
                brightness: 0,

                rank: D(0),
                rankresettime: D(0),
                ranktoken: 0,

                generators: new Array(8).fill(D(0)),
                generatorsBought: new Array(8).fill(D(0)),
                generatorsCost: [D(1), D('1e4'), D('1e9'), D('1e16'), D('1e25'), D('1e36'), D('1e49'), D('1e64')],
                generatorsMode: new Array(8).fill().map((_, i) => i),

                accelerators: new Array(8).fill(D(0)),
                acceleratorsBought: new Array(8).fill(D(0)),
                acceleratorsCost: [D(10), D('1e10'), D('1e20'), D('1e40'), D('1e80'), D('1e160'), D('1e320'), D('1e640')],

                darkmoney: D(0),
                darkgenerators: new Array(8).fill(D(0)),
                darkgeneratorsBought: new Array(8).fill(D(0)),
                darkgeneratorsCost: [D('1e100'), D('1e108'), D('1e127'), D('1e164'), D('1e225'), D('1e316'), D('1e423'), D('1e612')],

                tickspeed: 1000,

                onchallenge: false,
                challenges: new Array(8).fill(false),
                challengecleared: [],
                challengebonuses: new Array(15).fill(false),

                rankchallengecleared: [],
                rankchallengebonuses: new Array(15).fill(false),

                trophies: new Array(8).fill(false),

                levelitems: new Array(5).fill(0),
                levelitembought: 0,

                remember: 0,
                rememberspent: 0,
            };
        };
        this.player = initialData();
        this.players = new Array(10).fill().map(() => initialData());
        this.challengedata = {
            rewardcost: [1, 2, 4, 8, 8, 8, 16, 16, 16, 16, 32, 32, 32, 32, 32]
        };
        this.levelshopdata = {
            itemcost: [D('1e1'), D('1e2'), D('1e3'), D('1e4'), D('1e5')]
        }
        this.memory = 0;
        this.worldopened = new Array(10).fill().map(() => false);
        this.world = 0;
    };

    save() {
        this.players[this.world] = this.player;
    };

    loadb(worldDatab) {
        this.players = JSON.parse(atob(worldDatab));
        this.loadPlayer(this.players[this.world]);
    };

    loadPlayerb(playerDatab) {
        const saveData = JSON.parse(atob(playerDatab));
        this.loadPlayer(saveData);
    };

    loadPlayer(playerData) {
        this.player = {
            money: D(playerData.money),
            level: D(playerData.level),
            levelresettime: D(playerData.levelresettime),
            maxlevelgained: D(playerData.maxlevelgained ?? 1),
            token: playerData.token ?? 0,
            shine: playerData.shine ?? 0,
            brightness: playerData.brightness ?? 0,

            rank: D(playerData.rank ?? 0),
            rankresettime: D(playerData.rankresettime ?? 0),
            ranktoken: playerData.ranktoken ?? 0,

            generators: playerData.generators.map(D),
            generatorsBought: playerData.generatorsBought.map(D),
            generatorsCost: playerData.generatorsCost.map(D),
            generatorsMode: playerData.generatorsMode.map(v => parseInt(v)),

            accelerators: playerData.accelerators.map(D),
            acceleratorsBought: playerData.acceleratorsBought.map(D),
            acceleratorsCost: playerData.acceleratorsCost.map(D),

            darkmoney: D(playerData.darkmoney),
            darkgenerators: playerData.darkgenerators.map(D),
            darkgeneratorsBought: playerData.darkgeneratorsBought.map(D),
            darkgeneratorsCost: playerData.darkgeneratorsCost.map(D),

            tickspeed: parseFloat(playerData.tickspeed),

            onchallenge: playerData.onchallenge ?? false,
            challenges: numarr2boolarr(playerData.challenges, 8) ?? new Array(8).fill(false),
            challengecleared: playerData.challengecleared ?? [],
            challengebonuses: numarr2boolarr(playerData.challengebonuses, 15) ?? new Array(15).fill(false),

            rankchallengecleared: playerData.rankchallengecleared ?? [],
            rankchallengebonuses: numarr2boolarr(playerData.rankchallengebonuses, 15) ?? new Array(15).fill(false),

            trophies: new Array(8).fill(false),

            levelitems: playerData.levelitems ?? new Array(5).fill(0),
            levelitembought: playerData.levelitembought ?? 0,

            remember: playerData.remember ?? 0,
            rememberspent: playerData.rememberspent ?? 0,
        };
        this.checkTrophies();
        this.checkMemories();
        this.checkWorlds();
    };

    clone() {
        let nig = new Nig();
        nig.players = JSON.parse(JSON.stringify(this.players));
        nig.world = this.world;
        nig.loadPlayer(JSON.parse(JSON.stringify(this.player)));
        return nig;
    };

    softCap(num, cap) {
        if (num.lte(cap)) return num;
        return cap.mul(D(num.div(cap).log2()).add(1)).min(num);
    };

    strongSoftcap(num, cap) {
        if (num.lte(cap)) return num;
        return cap.mul(D(D(num.div(cap).log2()).add(1).log2()).add(1)).min(num);
    };

    calcIncrementMult(mu, i, to, highest) {
        let mult = mu;
        if (!this.isChallengeActive(4))
            mult = mult.mul(D(10).pow((i + 1) * (i - to)));

        if (!this.isChallengeActive(7))
            mult = mult.mul(this.softCap(this.player.levelresettime.add(1), D(100).mul(this.player.levelitems[2] + 1)));

        mult = mult.mul(D(this.player.level.add(2).log2()).pow(i - to));

        if (!this.isChallengeActive(2)) {
            if ((i < highest || this.isChallengeBonusActive(2)) && this.player.generatorsBought[i].gt(0)) {
                let mm = this.player.generatorsBought[i];
                if (this.isChallengeBonusActive(11)) mm = mm.mul(mm.add(2).log2());
                mult = mult.mul(mm);
            }
        }

        if (this.isChallengeBonusActive(3)) mult = mult.mul(D(2));
        if (this.isRankChallengeBonusActive(3)) mult = mult.mul(D(3));
        if (i == 0 && this.isChallengeBonusActive(7)) {
            if (this.isRankChallengeBonusActive(7))
                mult = mult.mul(this.strongSoftcap(this.player.maxlevelgained, D(100000)));
            else
                mult = mult.mul(this.player.maxlevelgained.min(100000));
        }
        mult = mult.mul(1 + this.memory * 0.25);
        if (this.isRankChallengeBonusActive(11))
            mult = mult.mul(D(2).pow(D(this.memory).div(12)));

        if (this.player.onchallenge && this.isRankChallengeBonusActive(4)) {
            let cnt = 0;
            this.player.challenges.forEach(b => cnt += b ? 1 : 0);
            mult = mult.mul(1 + cnt * 0.25);
        }

        if (this.player.darkgenerators[i].gte(1))
            mult = mult.mul(i + 2 + this.player.darkgenerators[i].log10());
        if (this.player.darkmoney.gte(1))
            mult = mult.mul(this.player.darkmoney.add(10).log10());

        return mult;
    };

    calcGeneratorExpr(mu = D(1)) {
        let highest = 0;
        for (let i = 0; i < 8; i++) if (this.player.generators[i].gt(0)) highest = i;
        let g = Array.from(new Array(9), (_, i) => new Array(Math.max(0, highest + 2 - i)).fill(D(0)));
        g[0][0] = this.player.money;
        for (let i = 0; i <= highest; i++) g[i + 1][0] = this.player.generators[i];
        for (let i = highest + 1; i-- > 0;) {
            if (!this.isChallengeBonusActive(13)) {
                const to = this.player.generatorsMode[i];
                const mult = this.calcIncrementMult(mu, i, to, highest);
                g[i + 1].forEach((gg, j) => g[to][j + 1] = g[to][j + 1].add(gg.mul(mult)));
            } else if (this.isChallengeActive(3)) {
                const to = 0;
                const mult = this.calcIncrementMult(mu, i, to, highest).mul(i + 1);
                g[i + 1].forEach((gg, j) => g[to][j + 1] = g[to][j + 1].add(gg.mul(mult)));
            } else {
                for (let to = 0; to <= i; to++) {
                    const mult = this.calcIncrementMult(mu, i, to, highest);
                    g[i + 1].forEach((gg, j) => g[to][j + 1] = g[to][j + 1].add(gg.mul(mult)));
                }
            }
            while (g[i].length > 0 && g[i][g[i].length - 1].eq(0)) g[i].pop();
        }
        return g;
    };
    calcAcceleratorExpr(mu = D(1)) {
        let highest = 0;
        for (let i = 1; i < 8; i++) if (this.player.accelerators[i].gt(0)) highest = i;
        let a = Array.from(new Array(8), (_, i) => new Array(Math.max(0, highest + 1 - i)).fill(D(0)));
        for (let i = 0; i <= highest; i++) a[i][0] = this.player.accelerators[i];
        for (let i = highest + 1; i-- > 1;) {
            let mult = mu;
            if (i == 1 ? this.isChallengeBonusActive(10) : this.isRankChallengeBonusActive(10))
                mult = mult.mul(this.player.acceleratorsBought[i].pow_base(2));
            a[i].forEach((aa, j) => a[i - 1][j + 1] = a[i - 1][j + 1].add(aa.mul(mult)));
            while (a[i - 1].length > 0 && a[i - 1][a[i - 1].length - 1].eq(0)) a[i - 1].pop();
        }
        return a;
    };
    calcDarkGeneratorExpr(mu = D(1)) {
        let highest = 0;
        for (let i = 0; i < 8; i++) if (this.player.darkgenerators[i].gt(0)) highest = i;
        let d = Array.from(new Array(9), (_, i) => new Array(Math.max(0, highest + 2 - i)).fill(D(0)));
        d[0][0] = this.player.darkmoney;
        for (let i = 0; i <= highest; i++) d[i + 1][0] = this.player.darkgenerators[i];
        for (let i = highest + 1; i-- > 0;) {
            d[i + 1].forEach((dd, j) => d[i][j + 1] = d[i][j + 1].add(dd.mul(mu)));
            while (d[i].length > 0 && d[i][d[i].length - 1].eq(0)) d[i].pop();
        }
        return d;
    };
    static calcAfterNtick(expr, n) {
        let p = D(1);
        let res = D(0);
        for (let i = 0; i < expr.length; i++) {
            res = res.add(expr[i].mul(p));
            p = p.mul(n.sub(i)).div(i + 1);
        }
        return res;
    };

    updateGenerators(mu = D(1), tick = D(1), gexpr = this.calcGeneratorExpr(mu)) {
        this.player.money = Nig.calcAfterNtick(gexpr[0], tick);
        for (let i = 0; i < 8; i++) this.player.generators[i] = Nig.calcAfterNtick(gexpr[i + 1], tick);
    };
    updateTickspeed() {
        const amult = this.isChallengeBonusActive(6) ? this.player.acceleratorsBought[0].pow_base(2) : D(1);
        let challengebonusescount = 0;
        this.player.challengebonuses.forEach(cb => challengebonusescount += cb ? 1 : 0);
        this.player.tickspeed = (1000 - this.player.levelitems[1] * challengebonusescount) / this.player.accelerators[0].add(10).mul(amult).log10();
    }
    updateAccelerators(mu = D(1), tick = D(1), aexpr = this.calcAcceleratorExpr(mu)) {
        for (let i = 0; i < 8; i++) this.player.accelerators[i] = Nig.calcAfterNtick(aexpr[i], tick);
        this.updateTickspeed();
    };
    updateDarkGenerators(mu = D(1), tick = D(1), dexpr = this.calcDarkGeneratorExpr(mu)) {
        this.player.darkmoney = Nig.calcAfterNtick(dexpr[0], tick);
        for (let i = 0; i < 8; i++) this.player.darkgenerators[i] = Nig.calcAfterNtick(dexpr[i + 1], tick);
    };

    spendShine(num) {
        if (this.player.shine < num) return;
        this.player.shine -= num;
        const val = D(11).pow(D(num).log10());
        this.updateGenerators(val);
        this.updateAccelerators(val);
    };
    spendBrightness(num) {
        if (this.player.brightness < num) return;
        this.player.brightness -= num;
        const val = D(11).pow(D(num * 100).log10());
        this.updateGenerators(val);
        this.updateAccelerators(val);
        this.updateDarkGenerators(D(num));
    };

    isChallengeActive(index) {
        return this.player.onchallenge && this.player.challenges[index]
    };
    isChallengeBonusActive(index) {
        return this.player.challengebonuses[4] || !this.player.onchallenge ? this.player.challengebonuses[index] : false;
    };
    isRankChallengeBonusActive(index) {
        return this.player.rankchallengebonuses[index];
    };

    isGeneratorBuyable(index) {
        if (this.isChallengeActive(6)) if (index == 3 || index == 7) return false;
        return this.player.money.gte(this.player.generatorsCost[index]);
    };
    calcGeneratorCost(index, bought) {
        const mult = bought.neq(0) && this.isChallengeActive(1) ? 2 : 1;
        return (index === 0 ? bought : bought.add(index + 1).mul(index + 1)).mul(mult).pow_base(10);
    };
    buyGenerator(index) {
        if (!this.isGeneratorBuyable(index)) return false;
        this.player.money = this.player.money.sub(this.player.generatorsCost[index]);
        this.player.generators[index] = this.player.generators[index].add(1);
        this.player.generatorsBought[index] = this.player.generatorsBought[index].add(1);
        this.player.generatorsCost[index] = this.calcGeneratorCost(index, this.player.generatorsBought[index]);
        return true;
    };

    isAcceleratorBuyable(index) {
        if (this.isChallengeActive(5)) return false;
        if (index >= 1 && this.player.levelresettime.lte(0)) return false;
        if (index >= 2 && this.player.levelitems[3] + 1 < index) return false;
        return this.player.money.gte(this.player.acceleratorsCost[index]);
    };
    calcAcceleratorCost(index, bought) {
        let p = bought.add(1);
        return p.mul(p.add(1)).div(2).mul(index === 0 ? 1 : D(10).mul(D(2).pow(index - 1))).pow_base(10);
    };
    buyAccelerator(index) {
        if (!this.isAcceleratorBuyable(index)) return false;
        this.player.money = this.player.money.sub(this.player.acceleratorsCost[index]);
        this.player.accelerators[index] = this.player.accelerators[index].add(1);
        this.player.acceleratorsBought[index] = this.player.acceleratorsBought[index].add(1);
        this.player.acceleratorsCost[index] = this.calcAcceleratorCost(index, this.player.acceleratorsBought[index]);
        return true;
    };

    isDarkGeneratorBuyable(index) {
        return this.player.money.gte(this.player.darkgeneratorsCost[index]);
    };
    calcDarkGeneratorCost(index, bought) {
        let p = 100 + (index == 0 ? 0 : (index + 1) * (index + 1) * (index + 1));
        let q = bought.mul(index + 1).mul(index + 1);
        return D(10).pow(q.add(p));
    };
    buyDarkGenerator(index) {
        if (!this.isDarkGeneratorBuyable(index)) return false;
        this.player.money = this.player.money.sub(this.player.darkgeneratorsCost[index]);
        this.player.darkgenerators[index] = this.player.darkgenerators[index].add(1);
        this.player.darkgeneratorsBought[index] = this.player.darkgeneratorsBought[index].add(1);
        this.player.darkgeneratorsCost[index] = this.calcDarkGeneratorCost(index, this.player.darkgeneratorsBought[index]);
        return true;
    };

    isRewardToggleable(index) {
        return this.player.challengebonuses[index] || (this.player.token >= this.challengedata.rewardcost[index]);
    };
    toggleReward(index) {
        if (this.isRewardToggleable(index)) {
            if (this.player.challengebonuses[index])
                this.player.token += this.challengedata.rewardcost[index];
            else
                this.player.token -= this.challengedata.rewardcost[index];
            this.player.challengebonuses[index] = !this.player.challengebonuses[index];
        }
    };
    isRankRewardToggleable(index) {
        return this.player.rankchallengebonuses[index] || (this.player.ranktoken >= this.challengedata.rewardcost[index]);
    };
    toggleRankReward(index) {
        if (this.isRankRewardToggleable(index)) {
            if (this.player.rankchallengebonuses[index])
                this.player.ranktoken += this.challengedata.rewardcost[index];
            else
                this.player.ranktoken -= this.challengedata.rewardcost[index];
            this.player.rankchallengebonuses[index] = !this.player.rankchallengebonuses[index];
        }
    };

    isLevelitemBuyable(index) {
        if (!this.player.rankresettime.gt(0)) return false;
        const cost = this.calcLevelitemCost(index);
        return !(this.player.level.lt(cost) || this.player.levelitems[index] >= 5);
    };
    calcLevelitemCost(index) {
        const d = index + 1;
        const cost = this.levelshopdata.itemcost[index].pow(this.player.levelitems[index] + 1);
        let dec = 0;
        for (let i = 1; i <= 5; i++) {
            if (4 * i * i * d * d * d <= this.player.levelitembought) dec = i;
        }
        return cost.div(D(10).pow(dec)).max(1);
    };
    buyLevelitems(index) {
        if (!this.player.rankresettime.gt(0)) return;
        const cost = this.calcLevelitemCost(index);
        if (this.player.level.lt(cost) || this.player.levelitems[index] >= 5) return;
        this.player.level = this.player.level.sub(cost);
        this.player.levelitems[index] = this.player.levelitems[index] + 1;
        if (this.player.levelitembought < 100000) this.player.levelitembought = this.player.levelitembought + 1;
    };

    configChallenge(index) {
        if (this.player.onchallenge) return;
        this.player.challenges[index] = !this.player.challenges[index];
    };

    isGeneratorModeChangeable() {
        return !this.isChallengeActive(3) && !this.isChallengeBonusActive(13);
    };
    resetGeneratorMode() {
        if (this.isGeneratorModeChangeable()) this.player.generatorsMode = new Array(8).fill().map((_, i) => i);
    };
    changeMode(index) {
        if (this.isChallengeActive(3)) return;
        this.player.generatorsMode[index] += 1;
        if (this.player.generatorsMode[index] > index) {
            this.player.generatorsMode[index] = 0;
        }
    };

    calcGainLevel() {
        const dividing = Math.max(1, 19 - this.player.rank.add(2).log2());
        let gainlevel = D(this.player.money.log10()).div(dividing).pow_base(2);

        const glmin = D(18).div(dividing).pow_base(2);
        const glmax = this.player.maxlevelgained.div(2);

        if (!glmin.add(0.1).gte(glmax)) {
            if (gainlevel.lt(glmax)) {
                let persent = D(1).sub(gainlevel.sub(glmin).div(glmax.sub(glmin)));
                persent = persent.pow(1 + this.player.levelitems[0]);
                persent = D(1).sub(persent);
                gainlevel = glmax.sub(glmin).mul(persent).add(glmin);
            }
        }
        gainlevel = gainlevel.round();
        if (this.isChallengeBonusActive(12)) gainlevel = gainlevel.mul(D(2));
        return gainlevel;
    };

    resetLevel(_force, exit) {
        const gainlevel = this.calcGainLevel();
        const gainlevelreset = this.player.rankresettime.add(1).mul(D(exit ? 0 : this.isChallengeBonusActive(8) ? 2 : 1));

        if (this.player.onchallenge) {
            this.player.onchallenge = false;
            this.player.token = this.player.token + 1;
            this.player.challengecleared.push(this.calcChallengeId());
        }

        this.player.money = D(1);
        this.player.level = this.player.level.add(exit ? D(0) : gainlevel);
        this.player.levelresettime = this.player.levelresettime.add(gainlevelreset);
        this.player.maxlevelgained = this.player.maxlevelgained.max(exit ? D(0) : gainlevel);

        this.player.generators = new Array(8).fill(D(0));
        this.player.generatorsBought = new Array(8).fill(D(0));
        this.player.generatorsCost = [D(1), D('1e4'), D('1e9'), D('1e16'), D('1e25'), D('1e36'), D('1e49'), D('1e64')];

        this.player.accelerators = new Array(8).fill(D(0));
        this.player.acceleratorsBought = new Array(8).fill(D(0));
        this.player.acceleratorsCost = [D(10), D('1e10'), D('1e20'), D('1e40'), D('1e80'), D('1e160'), D('1e320'), D('1e640')];

        this.player.tickspeed = 1000;

        if (this.isChallengeBonusActive(0)) this.player.money = D(10001);
        if (this.isChallengeBonusActive(1)) this.player.accelerators[0] = D(10);
        if (this.isRankChallengeBonusActive(0)) this.player.money = this.player.money.add(D('1e9'));
        if (this.isRankChallengeBonusActive(1)) this.player.accelerators[0] = this.player.accelerators[0].add(256);
    };

    resetRankborder() {
        return D(10).pow((this.isChallengeActive(0) ? 96 : 72) - this.checkRemembers() / 2.0);
    };

    calcChallengeId() {
        let challengeid = 0;
        for (let i = 0; i < 8; i++)
            challengeid = challengeid * 2 + (this.player.challenges[i] ? 1 : 0);
        return challengeid;
    };

    startChallenge() {
        this.resetLevel(true, true);
        this.player.onchallenge = true;
        if (this.player.challenges[3])
            this.player.generatorsMode = new Array(8).fill(0);
    };
    exitChallenge() {
        this.player.onchallenge = false;
        if (this.player.challenges[1]) {
            for (let i = 0; i < 8; i++)
                this.player.generatorsCost[i] = this.calcGeneratorCost(i, this.player.generatorsBought[i]);
        }
    };

    moveWorld(i) {
        if (this.world == i || !this.worldopened[i]) return;
        this.world = i;
        this.loadPlayer(this.players[this.world]);
    };
    checkTrophies() {
        if (this.player.levelresettime.gt(0)) this.player.trophies[0] = true;
        if (this.player.rankresettime.gt(0)) this.player.trophies[1] = true;
        if (this.player.shine > 0) this.player.trophies[2] = true;
        if (this.player.challengecleared.includes(238) || this.player.challengecleared.length >= 100) this.player.trophies[3] = true;
        if (this.player.brightness > 0) this.player.trophies[5] = true;
        if (this.player.remember > 0) this.player.trophies[6] = true;
        if (this.world == 0 && this.checkRemembers() > 0) this.player.trophies[6] = true;
    };
    checkMemories() {
        let cnt = 0;
        for (let i = 0; i < 10; i++) {
            if (this.world == i) continue;
            this.players[i].trophies.forEach(t => cnt += t ? 1 : 0);
        }
        this.memory = cnt;
    };
    checkRemembers() {
        let cnt = 0;
        for (let i = this.world + 1; i < 10; i++)
            cnt += this.players[i].remember;
        return cnt;
    };
    checkWorlds() {
        this.worldopened[0] = true;
        if (this.players[0].challengecleared.includes(238)) this.worldopened[1] = true;
        if (this.players[0].challengecleared.length >= 100) this.worldopened[2] = true;
        if (this.players[0].rankchallengecleared.length >= 16) this.worldopened[3] = true;
        if (this.players[0].levelitembought >= 100000) this.worldopened[4] = true;
        if (D(this.players[0].darkmoney).gte('1e8')) this.worldopened[5] = true;
        if (D(this.players[0].rank).gte(262142)) this.worldopened[6] = true;
        if (this.players[0].rankchallengecleared.includes(238)) this.worldopened[7] = true;
        if (this.players[0].challengecleared.length >= 200) this.worldopened[8] = true;
    };

    targetmoney(target, input) {
        try {
            let value = D(input);
            if (target == 'levelreset') {
                if (value.lt(2)) value = D('2');
            }
            const hasc0 = this.isChallengeActive(0);
            if (target == 'levelreset') {
                value = value.ceil();
                const dividing = D(Math.max(1, 19 - this.player.rank.add(2).log2()));
                const glmin = D(18).div(dividing).pow_base(2);
                const glmax = this.player.maxlevelgained.div(2);
                const diff = glmax.sub(glmin);
                let g = value.sub(0.5);
                if (!(glmin.add(0.1).gte(glmax)) && value.sub(0.5).lt(glmax)) {
                    g = glmax.sub(diff.mul(glmax.sub(value.sub(0.5)).div(diff).pow(1 / (1 + this.player.levelitems[0]))));
                }
                return dividing.mul(g.log2()).pow_base(10).max(D(hasc0 ? '1e24' : '1e18'));
            } else if (target == 'rankreset') {
                value = value.ceil();
                return D(value.sub(0.5).log2()).mul(36 - 1.2 * this.player.levelitems[4]).pow_base(10).max(this.resetRankborder());
            } else if (target == 'input') {
                return value;
            }
        } catch (error) {
            return D('NaN');
        }
        return D('NaN');
    };

    calcgoalticks(tmoney, update) {
        if (this.player.money.gte(tmoney)) return D(0);
        if (this.player.generators.every(g => g.eq(0))) return D('Infinity');
        const gexpr = this.calcGeneratorExpr();
        let ok = D(2);
        let ng = D(0);
        while (Nig.calcAfterNtick(gexpr[0], ok).lt(tmoney)) {
            ng = ok;
            ok = ok.mul(ok);
        }
        let cnt = 0;
        while (ng.add(1).lt(ok) && cnt < 60) {
            const m = ok.sub(ng).lt(4) ? ok.add(ng).div(2).floor() : ok.mul(ng).sqrt().floor();
            if (Nig.calcAfterNtick(gexpr[0], m).lt(tmoney)) {
                ng = m;
            } else {
                ok = m;
            }
            cnt += 1;
        }
        if (update) this.updateGenerators(D(1), ok, gexpr);
        return ok;
    };

    tick2sec(tick, update) {
        if (tick.lte(0)) return D(0);
        if (tick.eq(D('Infinity'))) return D('Infinity');
        const aexpr = this.calcAcceleratorExpr();
        const delay = D('1e-3');
        let challengebonusescount = 0;
        this.player.challengebonuses.forEach(cb => challengebonusescount += cb ? 1 : 0);
        const basetick = D(1000 - this.player.levelitems[1] * challengebonusescount).div(1000);
        const amult = this.isChallengeBonusActive(6) ? this.player.acceleratorsBought[0].pow_base(2) : D(1);
        let curtick = D(0);
        let prevdt = basetick.div(this.player.accelerators[0].add(10).mul(amult).log10());
        let sec = D(0);
        while (curtick.lt(tick)) {
            const prevtick = curtick;
            let ok = curtick.add(1);
            let ng = tick.add(1);
            let cnt = 0;
            while (ok.add(1).lt(ng) && cnt < 60) {
                const m = ng.sub(ok).lt(4) ? ok.add(ng).div(2).floor() : ok.mul(ng).sqrt().floor();
                if (basetick.div(Nig.calcAfterNtick(aexpr[0], m).add(10).mul(amult).log10()).add(delay).gt(prevdt)) {
                    ok = m;
                } else {
                    ng = m;
                }
                cnt += 1;
            }
            curtick = ok;
            if (prevtick.eq(curtick)) break;
            const dt = basetick.div(Nig.calcAfterNtick(aexpr[0], curtick).add(10).mul(amult).log10());
            sec = sec.add(prevdt.add(dt).div(2).mul(curtick.sub(prevtick)));
            prevdt = dt;
        }
        if (update) this.updateAccelerators(D(1), tick, aexpr);
        return sec;
    };

    simulate(checkpoints) {
        if (checkpoints.length == 0) return [];
        let idx = Array.from(checkpoints).fill().map((_, i) => i);
        idx.sort((i, j) => checkpoints[i].cmp(checkpoints[j]));
        let events = [];
        let maxchp = D(0);
        for (let i = 0; i < checkpoints.length; i++) {
            events.push([checkpoints[i], 0, i]);
            maxchp = maxchp.max(checkpoints[i]);
        }
        for (let i = 0; i < 8; i++) {
            if (!(this.isChallengeActive(6) && (i == 3 || i == 7))) {
                for (let j = this.player.generatorsBought[i]; ; j = j.add(1)) {
                    let c = this.calcGeneratorCost(i, j);
                    if (c.gte(maxchp)) break;
                    events.push([c, 1, i]);
                }
            }
            if (i == 0 || this.player.levelresettime.gt(0) && (i == 1 || this.player.levelitems[3] > i - 2)) {
                if (!this.isChallengeActive(5)) {
                    for (let j = this.player.acceleratorsBought[i]; ; j = j.add(1)) {
                        const c = this.calcAcceleratorCost(i, j);
                        if (c.gte(maxchp)) break;
                        events.push([c, 2, i]);
                    }
                }
            }
        }
        events.sort((a, b) => {
            const cmpn = (x, y) => x < y ? -1 : x > y ? +1 : 0
            let c = a[0].cmp(b[0]);
            if (c === 0) c = cmpn(a[1], b[1]);
            if (c === 0) c = cmpn(b[2], a[2]);
            return c;
        });
        let res = Array.from(checkpoints).fill(null);
        let totalticks = D(0);
        let totalsec = D(0);
        events.forEach(([c, ty, i]) => {
            const tick = this.calcgoalticks(c, ty !== 0);
            const sec = this.tick2sec(tick, ty !== 0);
            // console.log(c, ty, i, tick, sec, this.player.money);
            if (ty == 0) {
                res[i] = {
                    tick: totalticks.add(tick),
                    sec: totalsec.add(sec),
                };
            } else if (ty == 1) {
                console.assert(this.buyGenerator(i));
                totalticks = totalticks.add(tick);
                totalsec = totalsec.add(sec);
            } else {
                console.assert(this.buyAccelerator(i));
                totalticks = totalticks.add(tick);
                totalsec = totalsec.add(sec);
            }
        });
        return res;
    }

    maximumbonuses() {
        let mxtoken = this.player.token;
        for (let i = 0; i < 16; i++) {
            if (this.player.challengebonuses[i]) mxtoken += this.challengedata.rewardcost[i];
        }
        mxtoken = Math.max(mxtoken - 8, 0);
        const effectivechallengebonuses = [2, 3, 6, 7, 10, 11, 13];
        const m = 1 << effectivechallengebonuses.length;
        let costs = new Array(m).fill(0);
        let challengebonusescandidates = [];
        for (let i = 0; i < m; i++) {
            let ok = true;
            for (let j = 0; j < effectivechallengebonuses.length; j++) {
                if (!(i & 1 << j)) {
                    costs[i ^ 1 << j] = costs[i] + this.challengedata.rewardcost[effectivechallengebonuses[j]];
                    ok &= costs[i ^ 1 << j] > mxtoken;
                }
            }
            if (ok && costs[i] <= mxtoken) {
                let cs = [];
                for (let j = 0; j < effectivechallengebonuses.length; j++) {
                    if (i & 1 << j) {
                        cs.push(effectivechallengebonuses[j]);
                    }
                }
                challengebonusescandidates.push(cs);
            }
        }
        return challengebonusescandidates;
    }

    simulatechallenges(challengeid, challengebonusescandidates, rank) {
        let minres = {
            tick: D('Infinity'),
            sec: D('Infinity'),
            challengebonuses: [],
        };
        challengebonusescandidates.forEach(challengebonuses => {
            if (this.player.onchallenge) this.exitChallenge();
            for (let i = 0; i < 8; i++) {
                if (this.player.challenges[i]) this.configChallenge(i);
            }
            for (let i = 0; i < 15; i++) {
                if (this.player.challengebonuses[i]) this.toggleReward(i);
            }
            for (let i = 0; i < 8; i++) {
                this.player.generatorsMode[i] = i;
            }

            this.toggleReward(4);
            this.toggleReward(1);
            this.toggleReward(0);

            for (let i = 0; i < 8; i++) {
                if (challengeid & (1 << 7 - i)) {
                    this.configChallenge(i);
                }
            }
            this.startChallenge();
            if (this.player.challengebonuses[1]) this.toggleReward(1);
            if (this.player.challengebonuses[0]) this.toggleReward(0);

            challengebonuses.forEach(c => this.toggleReward(c));

            let checkpoints = [rank ? this.resetRankborder() : D(this.isChallengeActive(0) ? '1e24' : '1e18')];
            let res = this.simulate(checkpoints)[0];
            if (res.sec.lt(minres.sec)) {
                minres = {
                    tick: res.tick,
                    sec: res.sec,
                    challengebonuses: challengebonuses,
                };
            }
        });
        return minres;
    }
}

const colors = ['#00ff00', '#11ff52', '#23ff9b', '#34ffda', '#46eeff', '#57c2ff', '#699fff', '#7a86ff', '#a18cff', '#ca9dff', '#e9afff', '#ffc0ff'];
const sampletime = [1, 60, 3600, 86400, 2592000, 31536000, 3153600000];
const sampletimelabel = ['s', 'm', 'h', 'D', 'M', 'Y', 'C'];
const scalesampletime = t => Math.log10(Math.max(1, t)) / Math.log10(3153600000);
const colorbarpower = f => {
    const r = Math.max(0, Math.min(1, f));
    const n = colors.length - 1;
    const p = Math.floor(r * n);
    const q = r * n - p;
    if (p >= n) return colors[n];
    let col = 'rgb(';
    for (let j = 0; j < 3; j++) {
        const l = parseInt(colors[p].slice(j * 2 + 1, j * 2 + 3), 16);
        const r = parseInt(colors[p + 1].slice(j * 2 + 1, j * 2 + 3), 16);
        col += Math.round(l * (1 - q) + r * q);
        col += j < 2 ? ', ' : ')';
    }
    return col;
};

const app = Vue.createApp({
    data() {
        return {
            nig: new Nig(),
            shinechallengelength: [64, 96, 128, 160],
            brightnessrankchallengelength: [32, 64, 128],
            simulatedcheckpoints: Array.from(new Array(10), () => new Map()),
            challengesimulated: Array.from(new Array(10), () => new Array(256).fill(null)),
            rankchallengesimulated: Array.from(new Array(10), () => new Array(256).fill(null)),
            checkpoints: [D('1e18'), D('1e72')],
            sampletime: [1, 60, 3600, 86400, 2592000, 31536000, 3153600000],
            sampletimelabel: ['s', 'm', 'h', 'D', 'M', 'Y', 'C'],
            hideclearedchallenge: false,
            hidechallengecolor: false,
            hideclearedrankchallenge: false,
            hiderankchallengecolor: false,
            autosimulatecheckpoints: false,
            checkpointtarget: '',
            checkpointvalue: '',
        }
    },
    computed: {
        challengeid: function () {
            return (i, j) => {
                let id = 0;
                for (let k = 0; k < 4; k++) {
                    if (j % (1 << k + 1) >= (1 << k)) {
                        id += 1 << 7 - k;
                    }
                    if (i % (1 << k + 1) >= (1 << k)) {
                        id += 1 << 3 - k;
                    }
                }
                return id;
            };
        },
        challengecell: function () {
            let self = this;
            return (i, j, rank = false) => {
                const id = self.challengeid(i, j);
                const nowchallenging = self.nig.player.onchallenge && self.nig.calcChallengeId() == id;
                const clearedchallenge = rank ? self.nig.player.rankchallengecleared.includes(id) : self.nig.player.challengecleared.includes(id);
                return {
                    nowchallenging: nowchallenging,
                    clearedchallenge: clearedchallenge,
                    unchallengeable: i == 0 && j == 0,
                };
            };
        },
        challengescolor: function () {
            let self = this;
            return (i, j, rank = false) => {
                const id = self.challengeid(i, j);
                let color = 'transparent';
                const res = rank ? self.rankchallengesimulated[this.nig.world][id] : self.challengesimulated[this.nig.world][id];
                if (res !== null) {
                    const sec = res.sec;
                    if (sec.eq(D('Infinity'))) {
                        color = 'rgb(255, 255, 255)';
                    } else {
                        const f = sec.max(1).log10() / Math.log10(3153600000);
                        color = colorbarpower(f);
                    }
                }
                return { 'background-color': color };
            };
        },
        challengemessage: function () {
            let self = this;
            return (i, j, rank = false) => {
                const id = self.challengeid(i, j);
                const res = rank ? self.rankchallengesimulated[this.nig.world][id] : self.challengesimulated[this.nig.world][id];
                let message = 'Uncalculated';
                if (res !== null) {
                    message = res.tick.toExponential(3) + ' ticks';
                    message += '<br/>(' + res.sec.toExponential(3) + ' sec)';
                    message += '<br/>bonus [' + res.challengebonuses.map(x => x + 1) + ']';
                    // message += '<br/>id: ' + id;
                }
                return message;
            };
        },
        tmoney() {
            return this.nig.targetmoney(this.checkpointtarget, this.checkpointvalue);
        },
        gexpr() {
            return this.nig.calcGeneratorExpr();
        },
        aexpr() {
            return this.nig.calcAcceleratorExpr();
        },
        expression: function () {
            let self = this;
            return (i, ty) => {
                const e = ty == 0 ? self.gexpr[i] : self.aexpr[i];
                let content = '';
                e.forEach((e, i) => {
                    if (e.gt(0)) {
                        if (content != '') content += ' + ';
                        e.toExponential(1);
                        content += e.toExponential(1).replace('e+', '\\cdot10^{') + '}{}_NC_{' + i + '}';
                    }
                });
                if (content == '') content = '0';
                const name = ty == 0 ? (i == 0 ? 'ポイント' : '発生器' + i) : '時間加速器' + (i + 1);
                return name + ': \\(' + content + '\\)';
            };
        },
    },
    methods: {
        formatDecimal(d, places) {
            if (d.lt(D(10).pow(places))) {
                return d.toFixed(0);
            } else {
                return d.toExponential(places);
            }
        },
        importsave() {
            const prevworld = this.nig.world;
            const input = window.prompt('データを入力', '');
            if (input == '') return;
            let nig = new Nig();
            nig.loadb(input);
            this.nig = nig;
            for (let i = 0; i < 10; i++) {
                this.simulatedcheckpoints[i].clear();
                this.challengesimulated[i] = new Array(256).fill(null);
                this.rankchallengesimulated[i] = new Array(256).fill(null);
            }
            this.selectWorld(prevworld);
        },
        selectWorld(i) {
            this.nig.save();
            this.nig.moveWorld(i);
            if (this.autosimulatecheckpoints) this.simulatecheckpoints();
        },
        buyGenerator(i) {
            this.nig.buyGenerator(i);
            this.clearCheckpointsCache();
        },
        buyAccelerator(i) {
            this.nig.buyAccelerator(i);
            this.clearCheckpointsCache();
        },
        buyDarkGenerator(i) {
            this.nig.buyDarkGenerator(i);
            this.clearCheckpointsCache();
        },
        toggleReward(i) {
            this.nig.toggleReward(i);
            this.clearCheckpointsCache();
        },
        toggleRankReward(i) {
            this.nig.toggleRankReward(i);
            this.clearCheckpointsCache();
        },
        buyLevelitems(i) {
            this.nig.buyLevelitems(i);
            this.clearAllCache();
        },
        changeMode(i) {
            this.nig.changeMode(i);
            this.clearCheckpointsCache();
        },
        resetGeneratorMode(i) {
            this.nig.resetGeneratorMode(i);
            this.clearCheckpointsCache();
        },
        toggleChallenge() {
            if (this.nig.player.onchallenge) {
                this.nig.exitChallenge();
            } else {
                this.nig.startChallenge();
            }
            this.clearCheckpointsCache();
        },
        clearCheckpointsCache() {
            for (let i = 0; i < 10; i++) {
                this.simulatedcheckpoints[this.nig.world].clear();
            }
            if (this.autosimulatecheckpoints) this.simulatecheckpoints();
        },
        clearAllCache() {
            for (let i = 0; i < 10; i++) {
                this.simulatedcheckpoints[i].clear();
                this.challengesimulated[i] = new Array(256).fill(null);
                this.rankchallengesimulated[i] = new Array(256).fill(null);
            }
            if (this.autosimulatecheckpoints) this.simulatecheckpoints();
        },
        addcheckpoint() {
            if (this.tmoney.gt(0)) this.checkpoints.push(this.tmoney);
        },
        removecheckpoint(i) {
            this.checkpoints.splice(i, 1);
        },
        simulatecheckpoints() {
            setTimeout(() => {
                if (this.checkpoints.length == 0) return;
                let nig = this.nig.clone();
                const res = nig.simulate(this.checkpoints);
                res.forEach((r, i) => {
                    let content = this.checkpoints[i].toExponential(3) + ' ポイントまで ' + r.tick.toExponential(3) + ' ticks';
                    content += ' (' + r.sec.toExponential(3) + ' sec)';
                    content += ' ' + (new Date(Date.now() + Number(r.sec.mul(1000).toExponential(20)))).toLocaleString() + ' に達成';
                    this.simulatedcheckpoints[this.nig.world].set(this.checkpoints[i], content);
                });
            }, 0);
        },
        simulatechallenges(challengeid, challengebonusescandidates, rank) {
            setTimeout(() => {
                let sim = rank ? this.rankchallengesimulated : this.challengesimulated;
                if (sim[this.nig.world][challengeid] !== null) return;
                let nig = this.nig.clone();
                sim[this.nig.world][challengeid] = nig.simulatechallenges(challengeid, challengebonusescandidates, rank);
            }, 0);
        },
        simulatechallengesrec(challengeid, challengebonusescandidates, rank) {
            setTimeout(() => {
                if (challengeid >= 256) return;
                let sim = rank ? this.rankchallengesimulated : this.challengesimulated;
                if (sim[this.nig.world][challengeid] === null) {
                    let nig = this.nig.clone();
                    sim[this.nig.world][challengeid] = nig.simulatechallenges(challengeid, challengebonusescandidates, rank);
                }
                this.simulatechallengesrec(challengeid + 1, challengebonusescandidates, rank);
            }, 0);
        },
        simulatechallengeone(i, j, rank) {
            const id = this.challengeid(i, j);
            if (id <= 0 || 256 <= id) return;
            const challengebonusescandidates = this.nig.maximumbonuses();
            this.simulatechallenges(id, challengebonusescandidates, rank);
        },
        simulatechallengesall(rank) {
            const challengebonusescandidates = this.nig.maximumbonuses();
            this.simulatechallengesrec(1, challengebonusescandidates, rank);
        },
        scalesampletime(t) {
            const r = Math.log10(t) / Math.log10(3153600000) * 100;
            return {
                position: 'absolute',
                left: '' + r + '%',
                transform: 'translateX(-50%)',
                '-webkit-transform': ' translateX(-50%)',
                '-ms-transform': ' translateX(-50%)',
            }
        },
        buttonselectedcls(cond) {
            return {
                'btn-dark': cond,
                'btn-outline-dark': !cond,
            };
        },
    },
    mounted() {
        setTimeout(() => renderMathInElement(document.getElementById('gaexpression'), { delimiters: [{ left: "\\(", right: "\\)", display: false }] }), 0);
    },
    updated() {
        setTimeout(() => renderMathInElement(document.getElementById('gaexpression'), { delimiters: [{ left: "\\(", right: "\\)", display: false }] }), 0);
    },
});
app.config.isCustomElement = tag => {
    const custom = ['mi', 'mrow', 'annotation', 'semantics', 'math'];
    return custom.includes(tag);
};
app.mount('#app');
