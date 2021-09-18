const matrix_mul_lowertri = (a, b) => {
    let c = Array.from(new Array(a.length), () => new Array(b[0].length).fill(new Decimal(0)));
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j <= i; j++) {
            for (let k = j; k <= i; k++) {
                c[i][j] = c[i][j].add(a[i][k].mul(b[k][j]));
            }
        }
    }
    return c;
};
const vec_mul_matrix_lowertri = (a, b) => {
    let c = new Array(b[0].length).fill(new Decimal(0));
    for (let j = 0; j < b[0].length; j++) {
        for (let k = j; k < b.length; k++) {
            c[j] = c[j].add(a[k].mul(b[k][j]));
        }
    }
    return c;
};
const vec_mul_matrix_lowertri00 = (a, b) => {
    let c = new Decimal(0);
    for (let k = 0; k < b.length; k++) {
        c = c.add(a[k].mul(b[k][0]));
    }
    return c;
};
const matrix_eye = (n) => {
    let a = Array.from(new Array(n), () => new Array(n).fill(new Decimal(0)));
    for (let i = 0; i < n; i++) {
        a[i][i] = new Decimal(1);
    }
    return a;
};
const matrix_pow_lowertri = (a, n) => {
    let res = matrix_eye(a.length);
    const matrix_pow_inner = (b, m) => {
        const m2 = m.add(m);
        if (m2.lessThanOrEqualTo(n)) {
            const b2 = matrix_mul_lowertri(b, b);
            matrix_pow_inner(b2, m2);
        }
        if (m.lessThanOrEqualTo(n)) {
            n = n.sub(m);
            res = matrix_mul_lowertri(res, b);
        }
    };
    matrix_pow_inner(a, new Decimal(1));
    return res;
};

class Nig {
    constructor() {
        const initialData = () => {
            return {
                money: new Decimal(1),
                level: new Decimal(0),
                levelresettime: new Decimal(0),
                maxlevelgained: new Decimal(1),
                token: 0,
                shine: 0,

                rank: new Decimal(0),
                rankresettime: new Decimal(0),

                generators: new Array(8).fill(null).map(() => new Decimal(0)),
                generatorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
                generatorsCost: [
                    new Decimal(1),
                    new Decimal('1e4'),
                    new Decimal('1e9'),
                    new Decimal('1e16'),
                    new Decimal('1e25'),
                    new Decimal('1e36'),
                    new Decimal('1e49'),
                    new Decimal('1e64')
                ],
                generatorsMode: new Array(8).fill(null).map((_, i) => i),

                accelerators: new Array(8).fill(null).map(() => new Decimal(0)),
                acceleratorsBought: new Array(8).fill(null).map(() => new Decimal(0)),
                acceleratorsCost: [
                    new Decimal(10),
                    new Decimal('1e10'),
                    new Decimal('1e20'),
                    new Decimal('1e40'),
                    new Decimal('1e80'),
                    new Decimal('1e160'),
                    new Decimal('1e320'),
                    new Decimal('1e640'),
                ],

                tickspeed: 1000,

                onchallenge: false,
                challenges: [],
                challengecleared: [],
                challengebonuses: [],

                rankchallengecleared: [],
                trophies: new Array(4).fill(null).map(() => false),

                levelitems: [0, 0],
            };
        };
        this.player = initialData();
        this.players = new Array(10).fill(null).map(() => initialData());
        this.activechallengebonuses = [];
        this.challengedata = {
            rewardcost: [1, 2, 4, 8, 8, 8, 16, 16, 16, 16, 32, 32, 32, 32, 32]
        };
        this.memory = 0;
        this.worldopened = new Array(10).fill(null).map(() => false);
        this.world = 0;
    };

    loadb(worldDatab) {
        this.players = JSON.parse(atob(worldDatab));
        this.loadplayer(this.players[this.world]);
    }

    loadplayerb(playerDatab) {
        let saveData = JSON.parse(atob(playerDatab));
        this.loadplayer(saveData);
    }

    loadplayer(playerData) {
        this.player = {
            money: new Decimal(playerData.money),
            level: new Decimal(playerData.level),
            levelresettime: new Decimal(playerData.levelresettime),
            maxlevelgained: new Decimal(playerData.maxlevelgained ?? 1),
            token: playerData.token ?? 0,
            shine: playerData.shine ?? 0,

            rank: new Decimal(playerData.rank ?? 0),
            rankresettime: new Decimal(playerData.rankresettime ?? 0),

            generators: playerData.generators.map(v => new Decimal(v)),
            generatorsBought: playerData.generatorsBought.map(v => new Decimal(v)),
            generatorsCost: playerData.generatorsCost.map(v => new Decimal(v)),
            generatorsMode: playerData.generatorsMode.map(v => parseInt(v)),

            accelerators: playerData.accelerators.map(v => new Decimal(v)),
            acceleratorsBought: playerData.acceleratorsBought.map(v => new Decimal(v)),
            acceleratorsCost: playerData.acceleratorsCost.map(v => new Decimal(v)),

            tickspeed: parseFloat(playerData.tickspeed),

            onchallenge: playerData.onchallenge ?? false,
            challenges: playerData.challenges ?? [],
            challengecleared: playerData.challengecleared ?? [],
            challengebonuses: playerData.challengebonuses ?? [],

            rankchallengecleared: playerData.rankchallengecleared ?? [],
            trophies: new Array(4).fill(null).map(() => false),

            levelitems: playerData.levelitems ?? [0, 0],
        };
        this.activechallengebonuses = !this.player.onchallenge || this.player.challengebonuses.includes(4) ? this.player.challengebonuses : [];
        this.calcaccost();
        this.checktrophies();
        this.checkmemories();
        this.checkworlds();
    };

    softCap(num, cap) {
        if (num.lessThanOrEqualTo(cap)) return num;
        let capped = num.div(cap);
        capped = new Decimal(capped.log2()).add(1);
        return cap.mul(capped).min(num);
    };

    calcaccost() {
        for (let i = 0; i < 8; i++) {
            let p = this.player.acceleratorsBought[i].add(1);
            p = p.mul(p.add(1)).div(2);
            p = p.mul(i === 0 ? 1 : new Decimal(10).mul(new Decimal(2).pow(i - 1)));
            this.player.acceleratorsCost[i] = p.pow_base(10);
        }
    };

    calcincrementmult(i, to) {
        let mult = new Decimal(1);
        if (!(this.player.onchallenge && this.player.challenges.includes(4))) {
            mult = mult.mul(new Decimal(10).pow((i + 1) * (i - to)));
        }
        if (!(this.player.onchallenge && this.player.challenges.includes(7))) {
            let cap = new Decimal(100).mul(new Decimal(2).pow(this.player.levelitems[0]));
            mult = mult.mul(this.softCap(this.player.levelresettime.add(1), cap));
        }
        mult = mult.mul(new Decimal(this.player.level.add(2).log2()).pow(i - to));
        let highest = 0;
        for (let j = 0; j < 8; j++) {
            if (this.player.generators[j].greaterThan(0)) {
                highest = j;
            }
        }

        if (!(this.player.onchallenge && this.player.challenges.includes(2))) {
            let mm = this.player.generatorsBought[i];
            if (this.activechallengebonuses.includes(11)) {
                mm = mm.mul(new Decimal(mm.add(2).log2()).round());
            }
            if (i < highest && this.player.generatorsBought[i].greaterThan(0)) {
                mult = mult.mul(mm);
            } else {
                if (this.activechallengebonuses.includes(2) && this.player.generatorsBought[i].greaterThan(0)) {
                    mult = mult.mul(mm);
                }
            }
        }

        if (this.activechallengebonuses.includes(3)) {
            mult = mult.mul(new Decimal(2));
        }

        if (i == 0 && this.activechallengebonuses.includes(7)) {
            mult = mult.mul(this.player.maxlevelgained.min(100000));
        }

        mult = mult.mul(1 + this.memory * 0.25);

        return mult;
    };

    updategenerators(mu) {
        let a = vec_mul_matrix_lowertri(this.amount(), matrix_pow_lowertri(this.multmatrix(), mu));
        this.player.money = a[0];
        for (let i = 0; i < 8; i++) {
            this.player.generators[i] = a[i + 1];
        }
    };

    updateaccelerators(mu) {
        let a = vec_mul_matrix_lowertri(this.accamount(), matrix_pow_lowertri(this.accmultmatrix(), mu));
        for (let i = 0; i < 8; i++) {
            this.player.accelerators[i] = a[i];
        }
        let amult = new Decimal(1);
        if (this.activechallengebonuses.includes(6)) amult = amult.mul(this.player.acceleratorsBought[0].max(1));
        this.player.tickspeed = 1000 / this.player.accelerators[0].add(10).mul(amult).log10();
    };

    configchallenge(index) {
        if (this.player.onchallenge) return;
        if (!this.player.challenges.includes(index)) {
            this.player.challenges.push(index);
        } else {
            this.player.challenges.splice(this.player.challenges.indexOf(index), 1);
        }
    };

    buyGenerator(index) {
        if (this.player.onchallenge && this.player.challenges.includes(6)) {
            if (index > 2) {
                return false;
            }
        }
        if (this.player.money.greaterThanOrEqualTo(this.player.generatorsCost[index])) {
            this.player.money = this.player.money.sub(this.player.generatorsCost[index]);
            this.player.generators[index] = this.player.generators[index].add(1);
            this.player.generatorsBought[index] = this.player.generatorsBought[index].add(1);
            this.player.generatorsCost[index] = index === 0 ?
                new Decimal(10).pow(this.player.generatorsBought[0]) :
                new Decimal(10).pow(this.player.generatorsBought[index].add(index + 1).mul(index + 1));
            if (this.player.onchallenge && this.player.challenges.includes(1)) {
                this.player.generatorsCost[index] = this.player.generatorsCost[index].pow(2);
            }
        }
        return true;
    };
    buyAccelerator(index) {
        if (this.player.onchallenge && this.player.challenges.includes(5)) return false;
        if (this.player.money.greaterThanOrEqualTo(this.player.acceleratorsCost[index])) {
            this.player.money = this.player.money.sub(this.player.acceleratorsCost[index]);
            this.player.accelerators[index] = this.player.accelerators[index].add(1);
            this.player.acceleratorsBought[index] = this.player.acceleratorsBought[index].add(1);
            this.calcaccost();
        }
        return true;
    };
    buyRewards(index) {
        if (this.player.challengebonuses.includes(index)) {
            this.player.challengebonuses.splice(this.player.challengebonuses.indexOf(index), 1);
            this.player.token += this.challengedata.rewardcost[index];
        } else {
            if (this.player.token < this.challengedata.rewardcost[index]) {
                return;
            }
            this.player.challengebonuses.push(index);
            this.player.token -= this.challengedata.rewardcost[index];
        }
    };

    resetLevel(_force, exit) {
        let dividing = 19 - this.player.rank.add(2).log2();
        if (dividing < 1) dividing = 1;
        let gainlevel = new Decimal(this.player.money.log10()).div(dividing).pow_base(2).round();
        if (this.activechallengebonuses.includes(12)) gainlevel = gainlevel.mul(new Decimal(2));
        let gainlevelreset = this.player.rankresettime.add(1).mul(new Decimal(exit ? 0 : this.activechallengebonuses.includes(8) ? 2 : 1));

        if (this.player.onchallenge) {
            this.player.onchallenge = false;
            this.player.token = this.player.token + 1;
            this.activechallengebonuses = this.player.challengebonuses;
            this.player.challengecleared.push(this.calcchallengeid());
        }

        this.player.money = new Decimal(1);
        this.player.level = this.player.level.add(exit ? new Decimal(0) : gainlevel);
        this.player.levelresettime = this.player.levelresettime.add(gainlevelreset);
        this.player.maxlevelgained = this.player.maxlevelgained.max(exit ? new Decimal(0) : gainlevel);

        this.player.generators = new Array(8).fill(null).map(() => new Decimal(0));
        this.player.generatorsBought = new Array(8).fill(null).map(() => new Decimal(0));
        this.player.generatorsCost = [new Decimal(1), new Decimal('1e4'), new Decimal('1e9'), new Decimal('1e16'), new Decimal('1e25'), new Decimal('1e36'), new Decimal('1e49'), new Decimal('1e64')];

        this.player.accelerators = new Array(8).fill(null).map(() => new Decimal(0));
        this.player.acceleratorsBought = new Array(8).fill(null).map(() => new Decimal(0));
        this.player.acceleratorsCost = [new Decimal(10), new Decimal('1e10'), new Decimal('1e20'), new Decimal('1e40'), new Decimal('1e80'), new Decimal('1e160'), new Decimal('1e320'), new Decimal('1e640')];

        this.player.tickspeed = 1000;

        if (this.activechallengebonuses.includes(0)) this.player.money = new Decimal(10001);
        if (this.activechallengebonuses.includes(1)) this.player.accelerators[0] = new Decimal(10);
    };

    calcchallengeid() {
        let challengeid = 0;
        for (let i = 0; i < 8; i++) {
            challengeid *= 2;
            if (this.player.challenges.includes(i)) {
                challengeid += 1;
            }
        }
        return challengeid;
    };

    startChallenge() {
        if (!this.player.challengebonuses.includes(4)) this.activechallengebonuses = [];
        this.resetLevel(true, true);
        this.player.onchallenge = true;
        for (let i = 0; i < 8; i++) {
            if (this.player.challenges.includes(3)) this.player.generatorsMode[i] = 0;
        }
    };
    exitChallenge() {
        this.player.onchallenge = false;
        this.activechallengebonuses = this.player.challengebonuses;
        if (this.player.challenges.includes(1)) {
            for (let i = 0; i < 8; i++) {
                this.player.generatorsCost[i] = i === 0 ?
                    new Decimal(10).pow(this.player.generatorsBought[0]) :
                    new Decimal(10).pow(this.player.generatorsBought[i].add(i + 1).mul(i + 1));
            }
        }
    };

    moveworld(i) {
        if (this.world == i || !this.worldopened[i]) return;
        this.world = i;
        this.loadplayer(this.players[this.world]);
    };
    checktrophies() {
        if (this.player.levelresettime.greaterThan(0)) this.player.trophies[0] = true;
        if (this.player.rankresettime.greaterThan(0)) this.player.trophies[1] = true;
        if (this.player.shine > 0) this.player.trophies[2] = true;
        if (this.player.challengecleared.includes(238) || this.player.challengecleared.length >= 100) this.player.trophies[3] = true;
    };
    checkmemories() {
        let cnt = 0;
        for (let i = 0; i < 10; i++) {
            if (this.world == i) continue;
            for (let j = 0; j < 4; j++) {
                if (this.players[i].trophies[j]) cnt += 1;
            }
        }
        this.memory = cnt;
    };
    checkworlds() {
        this.worldopened[0] = true;
        for (let i = 0; i < 10; i++) {
            if (this.players[i].challengecleared.includes(238)) this.worldopened[1] = true;
            if (this.players[i].challengecleared.length >= 100) this.worldopened[2] = true;
        }
    };

    // ================================================================================

    multmatrix() {
        let multmat = matrix_eye(9);
        for (let i = 0; i < 8; i++) {
            if (!this.activechallengebonuses.includes(13)) {
                const to = this.player.generatorsMode[i];
                multmat[i + 1][to] = multmat[i + 1][to].add(this.calcincrementmult(i, to));
            } else if (this.player.onchallenge && this.player.challenges.includes(3)) {
                multmat[i + 1][0] = multmat[i + 1][0].add(this.calcincrementmult(i, 0).mul(i + 1));
            } else {
                for (let to = 0; to <= i; to++) {
                    multmat[i + 1][to] = multmat[i + 1][to].add(this.calcincrementmult(i, to));
                }
            }
        }
        return multmat;
    }
    amount() {
        let b = new Array(9).fill(new Decimal(0));
        b[0] = this.player.money;
        for (let i = 0; i < this.player.generators.length; i++) {
            b[i + 1] = this.player.generators[i];
        }
        return b;
    }

    accmultmatrix() {
        let multmat = matrix_eye(8);
        for (let i = 1; i < 8; i++) {
            let mult = new Decimal(1);
            if (this.activechallengebonuses.includes(10)) {
                mult = mult.mul(this.player.acceleratorsBought[i]);
            }
            multmat[i][i - 1] = multmat[i][i - 1].add(mult);
        }
        return multmat;
    }
    accamount() {
        let b = new Array(8).fill(new Decimal(0));
        for (let i = 0; i < this.player.accelerators.length; i++) {
            b[i] = this.player.accelerators[i];
        }
        return b;
    }

    targetmoney(target, input) {
        try {
            let value = new Decimal(input);
            if (target == 'levelreset') {
                if (value.lessThan(2)) value = new Decimal('2');
            } else if (target == 'rankreset') {
                if (value.lessThan(4)) value = new Decimal('4');
            }
            const hasc0 = this.player.onchallenge && this.player.challenges.includes(0);
            if (target == 'levelreset') {
                return new Decimal(19).sub(this.player.rank.add(2).log2()).max(1).mul((value.sub(0.5)).log2()).pow_base(10).max(new Decimal(hasc0 ? '1e24' : '1e18'));
            } else if (target == 'rankreset') {
                return new Decimal(value.sub(0.5).log2()).mul(36).pow_base(10).max(new Decimal(hasc0 ? '1e96' : '1e72'));
            } else if (target == 'input') {
                return value;
            }
        } catch (error) {
            return new Decimal('NaN');
        }
        return new Decimal('NaN');
    }

    calcgoalticks(tmoney, update) {
        const multmat = this.multmatrix();
        const amount = this.amount();

        if (amount[0].greaterThanOrEqualTo(tmoney)) return new Decimal(0);
        if (amount.slice(1).every((a) => a.eq(0))) return new Decimal('Infinity');
        let base = [multmat, new Decimal(1)];
        let bases = [];
        while (vec_mul_matrix_lowertri(amount, base[0])[0].lessThan(tmoney)) {
            bases.push(base);
            base = [matrix_mul_lowertri(base[0], base[0]), base[1].add(base[1])];
        }
        base = [amount, new Decimal(0)];
        while (bases.length > 0) {
            const bb = bases.pop();
            const m = vec_mul_matrix_lowertri(base[0], bb[0]);
            if (m[0].lessThan(tmoney)) {
                base = [m, base[1].add(bb[1])];
            }
        }
        if (update) {
            const a = vec_mul_matrix_lowertri(base[0], multmat);
            this.player.money = a[0];
            for (let i = 0; i < 8; i++) {
                this.player.generators[i] = a[i + 1];
            }
        }
        return base[1].add(new Decimal(1));
    }

    tick2sec(tick) {
        // console.log(tick);
        const accmultmat = this.accmultmatrix();
        const accamount = this.accamount();
        if (tick.lessThanOrEqualTo(0)) return [new Decimal(0), new Decimal(0)];
        if (tick.eq(new Decimal('Infinity'))) return [new Decimal('Infinity'), new Decimal('Infinity')];
        // const delay = tick.mul('1e-6').max(new Decimal('1e-3'));
        const delay = new Decimal('1e-3');
        let base = [accmultmat, new Decimal(1)];
        let bases = [];
        while (base[1].lessThanOrEqualTo(tick)) {
            bases.push(base);
            base = [matrix_mul_lowertri(base[0], base[0]), base[1].add(base[1])];
        }
        let amult = this.activechallengebonuses.includes(6) ? this.player.acceleratorsBought[0].max(1) : new Decimal(1);
        let sec = new Decimal(0);
        base = [accamount, new Decimal(0)];
        let prevdt = (new Decimal(1)).div(base[0][0].add(10).mul(amult).log10());
        while (base[1].lessThan(tick)) {
            const prevtick = base[1];
            for (let i = bases.length; i-- > 0;) {
                if (base[1].add(bases[i][1]).lessThanOrEqualTo(tick)) {
                    if (i == 0 && prevtick.eq(base[1]) || (new Decimal(1)).div(vec_mul_matrix_lowertri00(base[0], bases[i][0]).add(10).mul(amult).log10()).add(delay).greaterThan(prevdt)) {
                        base = [vec_mul_matrix_lowertri(base[0], bases[i][0]), base[1].add(bases[i][1])];
                    }
                }
            }
            if (prevtick.eq(base[1])) break;
            const dt = (new Decimal(1)).div(base[0][0].add(10).mul(amult).log10());
            sec = sec.add((prevdt.add(dt)).div(2).mul(base[1].sub(prevtick)));
            prevdt = dt;
        }
        return sec;
    }

    calcgeneratorcost(index, bought) {
        const mult = bought.neq(0) && this.player.onchallenge && this.player.challenges.includes(1) ? 2 : 1;
        return (index === 0 ? bought : bought.add(index + 1).mul(index + 1)).mul(mult).pow_base(10);
    }
    calcacceleratorcost(index, bought) {
        let p = bought.add(1);
        p = p.mul(p.add(1)).div(2);
        p = p.mul(index === 0 ? 1 : new Decimal(10).mul(new Decimal(2).pow(index - 1)));
        return p.pow_base(10);
    }

    simulate(checkpoints) {
        if (checkpoints.length == 0) return [];
        let idx = Array.from(checkpoints).fill(null).map((_, i) => i);
        idx.sort((i, j) => checkpoints[i].cmp(checkpoints[j]));
        let events = [];
        let maxchp = new Decimal(0);
        for (let i = 0; i < checkpoints.length; i++) {
            events.push([checkpoints[i], 0, i]);
            maxchp = maxchp.max(checkpoints[i]);
        }
        for (let i = 0; i < 8; i++) {
            if (!(this.player.onchallenge && this.player.challenges.includes(6) && i > 2)) {
                for (let j = this.player.generatorsBought[i]; ; j = j.add(1)) {
                    let c = this.calcgeneratorcost(i, j);
                    if (c.greaterThanOrEqualTo(maxchp)) break;
                    events.push([c, 1, i]);
                }
            }
            if (i == 0 || this.player.levelresettime.gt(0) && (i == 1 || this.player.levelitems[1] > i - 2)) {
                if (!(this.player.onchallenge && this.player.challenges.includes(5))) {
                    for (let j = this.player.acceleratorsBought[i]; ; j = j.add(1)) {
                        let c = this.calcacceleratorcost(i, j);
                        if (c.greaterThanOrEqualTo(maxchp)) break;
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
        let totalticks = new Decimal(0);
        let totalsec = new Decimal(0);
        events.forEach(([c, ty, i]) => {
            let tick = this.calcgoalticks(c, ty !== 0);
            const sec = this.tick2sec(tick);
            // console.log(c, ty, i, tick);
            if (ty == 0) {
                res[i] = {
                    tick: totalticks.add(tick),
                    sec: totalsec.add(sec),
                };
            } else if (ty == 1) {
                // this.updategenerators(tick);
                this.updateaccelerators(tick);
                console.assert(this.buyGenerator(i));
                totalticks = totalticks.add(tick);
                totalsec = totalsec.add(sec);
            } else {
                // this.updategenerators(tick);
                this.updateaccelerators(tick);
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
            if (this.player.challengebonuses.includes(i)) mxtoken += this.challengedata.rewardcost[i];
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
            tick: new Decimal('Infinity'),
            sec: new Decimal('Infinity'),
            challengebonuses: [],
        };
        challengebonusescandidates.forEach(challengebonuses => {
            if (this.player.onchallenge) this.exitChallenge();
            for (let i = 0; i < 8; i++) {
                if (this.player.challenges.includes(i)) this.configchallenge(i);
            }
            for (let i = 0; i < 16; i++) {
                if (this.player.challengebonuses.includes(i)) this.buyRewards(i);
            }
            for (let i = 0; i < 8; i++) {
                this.player.generatorsMode[i] = i;
            }

            this.buyRewards(4);
            this.buyRewards(1);
            this.buyRewards(0);
            this.activechallengebonuses = (this.player.challengebonuses.includes(4) || !this.player.onchallenge) ? this.player.challengebonuses : [];

            for (let i = 0; i < 8; i++) {
                if (challengeid & (1 << 7 - i)) {
                    this.configchallenge(i);
                }
            }
            this.startChallenge();
            if (this.player.challengebonuses.includes(1)) this.buyRewards(1);
            if (this.player.challengebonuses.includes(0)) this.buyRewards(0);

            challengebonuses.forEach(c => this.buyRewards(c));
            this.activechallengebonuses = (this.player.challengebonuses.includes(4) || !this.player.onchallenge) ? this.player.challengebonuses : [];

            let checkpoints = [new Decimal(this.player.challenges.includes(0) ? (rank ? '1e96' : '1e24') : (rank ? '1e72' : '1e18'))];
            let res = this.simulate(checkpoints)[0];
            if (res.sec.lessThan(minres.sec)) {
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

Vue.createApp({
    data() {
        return {
            nig: new Nig(),
            simulatedcheckpoints: Array.from(new Array(10), () => new Map()),
            challengesimulated: Array.from(new Array(10), () => new Array(256).fill(null)),
            rankchallengesimulated: Array.from(new Array(10), () => new Array(256).fill(null)),
            checkpoints: [new Decimal('1e18'), new Decimal('1e72')],
            sampletime: [1, 60, 3600, 86400, 2592000, 31536000, 3153600000],
            sampletimelabel: ['s', 'm', 'h', 'D', 'M', 'Y', 'C'],
            hideclearedchallenge: false,
            hidechallengecolor: false,
            hideclearedrankchallenge: false,
            hiderankchallengecolor: false,
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
                const nowchallenging = self.nig.player.onchallenge && self.nig.calcchallengeid() == id;
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
                    if (sec.eq(new Decimal('Infinity'))) {
                        color = 'rgb(255, 255, 255)';
                    } else {
                        let f = sec.max(1).log10() / Math.log10(3153600000);
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
    },
    methods: {
        importsave() {
            const prevworld = this.nig.world;
            const input = window.prompt('データを入力', '');
            if (input == '') return;
            let nig = new Nig();
            nig.loadb(input);
            this.nig = nig;
            this.clearAllCache();
            this.selectWorld(prevworld);
        },
        selectWorld(i) {
            this.nig.moveworld(i);
        },
        clearCurrentCache() {
            this.simulatedcheckpoints[this.nig.world].clear();
            this.challengesimulated[this.nig.world] = new Array(256).fill(null);
        },
        clearAllCache() {
            for (let i = 0; i < 10; i++) {
                this.simulatedcheckpoints[i].clear();
                this.challengesimulated[i] = new Array(256).fill(null);
            }
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
                let nig = new Nig();
                nig.loadplayerb(btoa(JSON.stringify(this.nig.player)));
                nig.memory = this.nig.memory;
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
                if (this.challengesimulated[this.nig.world][challengeid] !== null) return;
                let nig = new Nig();
                nig.loadplayerb(btoa(JSON.stringify(this.nig.player)));
                nig.memory = this.nig.memory;
                if (rank) {
                    this.rankchallengesimulated[this.nig.world][challengeid] = nig.simulatechallenges(challengeid, challengebonusescandidates, rank);
                } else {
                    this.challengesimulated[this.nig.world][challengeid] = nig.simulatechallenges(challengeid, challengebonusescandidates, rank);
                }
            }, 0);
        },
        simulatechallengesrec(challengeid, challengebonusescandidates, rank) {
            setTimeout(() => {
                if (challengeid >= 256) return;
                if (this.challengesimulated[this.nig.world][challengeid] === null) {
                    let nig = new Nig();
                    nig.loadplayerb(btoa(JSON.stringify(this.nig.player)));
                    nig.memory = this.nig.memory;
                    if (rank) {
                        this.rankchallengesimulated[this.nig.world][challengeid] = nig.simulatechallenges(challengeid, challengebonusescandidates, rank);
                    } else {
                        this.challengesimulated[this.nig.world][challengeid] = nig.simulatechallenges(challengeid, challengebonusescandidates, rank);
                    }
                }
                this.simulatechallengesrec(challengeid + 1, challengebonusescandidates, rank);
            }, 0);
        },
        simulatechallengesall(rank) {
            const challengebonusescandidates = this.nig.maximumbonuses();
            this.simulatechallengesrec(1, challengebonusescandidates, rank);
        },
        scalesampletime(t) {
            let r = Math.log10(t) / Math.log10(3153600000) * 100;
            return {
                position: 'absolute',
                left: '' + r + '%',
                transform: 'translateX(-50%)',
                '-webkit-transform': ' translateX(-50%)',
                '-ms-transform': ' translateX(-50%)',
            }
        },
    },
}).mount('#app');
