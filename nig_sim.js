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

class ItemData {
    constructor() {
        this.challengetext = [
            '昇段リセットは1e24ポイントから可能になります',
            '発生器は高速に値上がりします',
            '発生器購入数による強化は無効になります',
            '発生器のモードは0に固定されます',
            '段位によらない基礎的な下位モード強化は無効となります',
            '時間加速器は購入できません',
            '発生器4と8は購入できません',
            '段位リセット回数による強化は無効になります',
        ];
        this.rewardtext = [
            '昇段リセット後1e4ポイント獲得',
            '昇段リセット後10個の時間加速器1獲得',
            '番号が最高の発生器にも購入数ボーナスが働く',
            '全発生器の生産力が2倍に',
            '挑戦中でも効力を有効に',
            '発生器自動購入器を入手',
            '時間加速器1に購入数ボーナスが働く',
            '発生器1の生産力が一度に取得した最大段位数倍に(上限:100000)',
            '段位リセット回数の増加分が2倍に',
            '時間加速器自動購入器を入手',
            '時間加速器2に購入数ボーナスが働く',
            '発生器の購入数ボーナスが強化',
            'リセット時の段位取得数が2倍に',
            '発生器は同時に全てのモードとなる',
            '自動昇段リセット器を入手',
        ];
        this.rankrewardtext = [
            '昇段リセット後1e9ポイント獲得',
            '昇段リセット後256個の時間加速器1獲得',
            '輝きの一度の入手数が2つに',
            '全発生器の生産力が3倍に',
            '受けている挑戦の数に応じて発生器が少し強化',
            '段位効力自動購入器を入手',
            '時間加速器3以降に購入数ボーナスが働く',
            '効力8が上限以降も少しだけ強化',
            '階位リセット回数の増加分が3倍に',
            '間隙が50毛秒に固定(発生器の生産力変化)',
            '時間加速器の購入数ボーナスが強化',
            '記憶が入手数に応じてさらに強化',
            'リセット時の階位取得数が3倍に',
            '全時間加速器が間隙に影響',
            '自動昇階リセット器を入手',
        ];
        this.rewardcost = [1, 2, 4, 8, 8, 8, 16, 16, 16, 16, 32, 32, 32, 32, 32];
        this.levelitemtext = [
            '段位取得量が最大取得段位以下の範囲で増加します',
            '取得している効力数によって、間隙が少しだけ短くなります',
            '段位リセット1回あたりの効果が弱くなるのが遅くなります',
            '新しい時間加速器を購入可能になります',
            '階位の入手量が少しだけ増加します',
        ];
        this.levelitemcost = [D('1e1'), D('1e2'), D('1e3'), D('1e4'), D('1e5')];
        this.trophytext = [
            '有段者',
            '有階者',
            '輝く者',
            '世界移動者',
            '裏の者',
            '煌く者',
            '想い出す者',
            '有冠者',
            '天上の者'
        ];
        this.smalltrophytext = [
            'ポイントを0より大きくする',
            'ポイントを777より大きくする',
            'ポイントを7777777より大きくする',
            'ポイントを1e19より大きくする',
            'ポイントを1e36より大きくする',
            'ポイントを1e77より大きくする',
            'ポイントを1e81より大きくする',
            'ポイントを1e303より大きくする',
            '発生器1を1つ以上購入する',
            '発生器2を1つ以上購入する',
            '発生器3を1つ以上購入する',
            '発生器4を1つ以上購入する',
            '発生器5を1つ以上購入する',
            '発生器6を1つ以上購入する',
            '発生器7を1つ以上購入する',
            '発生器8を1つ以上購入する',
            '時間加速器1を1つ以上購入する',
            '時間加速器2を1つ以上購入する',
            '時間加速器3を1つ以上購入する',
            '時間加速器4を1つ以上購入する',
            '時間加速器5を1つ以上購入する',
            '時間加速器6を1つ以上購入する',
            '時間加速器7を1つ以上購入する',
            '時間加速器8を1つ以上購入する',
            '段位リセットを200より大きくする',
            '段位リセットを999より大きくする',
            '挑戦1を達成する',
            '挑戦2を達成する',
            '挑戦3を達成する',
            '挑戦4を達成する',
            '挑戦5を達成する',
            '挑戦6を達成する',
            '挑戦7を達成する',
            '挑戦8を達成する',
            '挑戦を32種類以上達成する',
            '挑戦を64種類以上達成する',
            '挑戦を96種類以上達成する',
            '挑戦を128種類以上達成する',
            '挑戦を160種類以上達成する',
            '挑戦を192種類以上達成する',
            '挑戦を224種類以上達成する',
            '挑戦を255種類以上達成する',
            '階位リセットを1より大きくする',
            '階位リセットを4より大きくする',
            '階位リセットを9より大きくする',
            '階位リセットを99より大きくする',
            '階位リセットを999より大きくする',
            '段位効力の累計購入回数を4以上にする',
            '段位効力の累計購入回数を108以上にする',
            '段位効力の累計購入回数を256以上にする',
            '段位効力の累計購入回数を1728以上にする',
            '段位効力の累計購入回数を12500以上にする',
            '100以上の輝きを所持する',
            '1000以上の輝きを所持する',
            '10000以上の輝きを所持する',
            '100000以上の輝きを所持する',
            '1000000以上の輝きを所持する',
            '10000000以上の輝きを所持する',
            '設定タブ内で、データ吐き出しを行う',
            '設定タブ内で、ツイート設定機能を2つ以上設定する',
            '裏発生器1を1つ以上購入する',
            '裏発生器2を1つ以上購入する',
            '裏発生器3を1つ以上購入する',
            '裏発生器4を1つ以上購入する',
            '裏発生器5を1つ以上購入する',
            '裏発生器6を1つ以上購入する',
            '裏発生器7を1つ以上購入する',
            '裏発生器8を1つ以上購入する',
            '階位挑戦を32種類以上達成する',
            '階位挑戦を64種類以上達成する',
            '階位挑戦を96種類以上達成する',
            '階位挑戦を128種類以上達成する',
            '階位挑戦を160種類以上達成する',
            '階位挑戦を192種類以上達成する',
            '階位挑戦を224種類以上達成する',
            '階位挑戦を255種類以上達成する',
            '10以上の煌きを所有する',
            '100以上の煌きを所有する',
            '1000以上の煌きを所有する',
            '10000以上の煌きを所有する',
            '裏ポイントを1以上にする',
            '裏ポイントを777以上にする',
            '裏ポイントを7777777以上にする',
            '裏ポイントを1e18以上にする',
            '裏ポイントを1e72以上にする',
            '銅片を1個以上にする',
            '銅片を210個以上にする',
            '銅片を1275個以上にする',
            '銀片を1個以上にする',
            '銀片を210個以上にする',
            '銀片を1275個以上にする',
            '金片を1個以上にする',
            '金片を210個以上にする',
            '金片を1275個以上にする',
            '白金片を1個以上にする',
            '白金片を210個以上にする',
            '白金片を1275個以上にする',
            '裏段位を1以上にする',
            '裏段位を1e3より大きくする',
            '裏段位を1e10より大きくする',
            '冠位リセットを1以上にする',
            '冠位リセットを5以上にする',
            '冠位リセットを20以上にする',
            '冠位リセットを100以上にする',
            '時間回帰力を1以上にする',
            '時間回帰力を3以上にする',
            '時間回帰力を6以上にする',
            '時間回帰力を10以上にする',
            '階位を1e8より大きくする',
            '階位を1e10より大きくする',
            '階位を1e12より大きくする',
            '天上発生器1を1つ以上購入する',
            '天上発生器2を1つ以上購入する',
            '天上発生器3を1つ以上購入する',
            '天上発生器4を1つ以上購入する',
            '天上発生器5を1つ以上購入する',
            '天上発生器6を1つ以上購入する',
            '天上発生器7を1つ以上購入する',
            '天上発生器8を1つ以上購入する',
            '紫鋼片を1個以上にする',
            '紫鋼片を210個以上にする',
            '紫鋼片を1275個以上にする',
            '銅像を10個以上にする',
            '銀像を10個以上にする',
            '金像を10個以上にする',
            '白金像を10個以上にする'
        ]
        this.chipname = ['銅', '銀', '金', '白金', '紫鋼', '朱鋼', '蒼鋼', '翠鋼', '聖銀', '覇金'];
        this.chipbonusname = [
            '発生器効率',
            '発生器1効率',
            '発生器2効率',
            '発生器3効率',
            '発生器4効率',
            '発生器5効率',
            '発生器6効率',
            '発生器7効率',
            '発生器8効率',
            '間隙',
            '時間加速器1効率',
            '時間加速器2効率',
            '時間加速器3効率',
            '時間加速器4効率',
            '時間加速器5効率',
            '時間加速器6効率',
            '時間加速器7効率',
            '時間加速器8効率',
            '段位入手量',
            '段位効率',
            '段位リセット入手量',
            '段位リセット効率(工事中)',
            '階位入手量',
            '階位効率',
            '階位リセット入手量',
            '階位リセット効率(工事中)',
            '段位効力1効率',
            '段位効力2効率',
            '段位効力3効率',
            '段位効力5効率',
            '輝き入手割合',
            '輝き使用効率',
            '裏発生器1強化',
            '裏発生器2強化',
            '裏発生器3強化',
            '裏発生器4強化',
            '裏発生器5強化',
            '裏発生器6強化',
            '裏発生器7強化',
            '裏発生器8強化',
            '裏ポイント強化',
            '裏発生器1生産強化',
            '裏発生器2生産強化',
            '裏発生器3生産強化',
            '裏発生器4生産強化',
            '裏発生器5生産強化',
            '裏発生器6生産強化',
            '裏発生器7生産強化',
            '裏発生器8生産強化',
            '煌き入手割合',
            '煌き使用効率',
            '煌き使用効率裏',
        ];
    }
};

const itemdata = new ItemData();

class MaximumBonuses {
    constructor() {
        this.cache = new Map();
    };
    get(mxtoken, rank, onchallenge) {
        const key = { mxtoken: mxtoken, rank: rank, onchallenge: onchallenge };
        let res = this.cache.get(key);
        if (res === undefined) {
            res = MaximumBonuses.maximumbonuses(mxtoken, rank, onchallenge);
            this.cache.set(key, res);
        }
        return res;
    };
    static maximumbonuses(mxtoken, rank, onchallenge) {
        const effectivechallengebonuses = rank ? [3, 4, 6, 7, 9, 10, 11, 13] : [2, 3, 6, 7, 10, 11, 13];
        const m = 1 << effectivechallengebonuses.length;
        if (!rank && onchallenge) mxtoken = Math.max(mxtoken - 8, 0);
        let costs = new Array(m).fill(0);
        let challengebonusescandidates = [];
        for (let i = 0; i < m; i++) {
            let ok = true;
            for (let j = 0; j < effectivechallengebonuses.length; j++) {
                if (!(i & 1 << j)) {
                    costs[i ^ 1 << j] = costs[i] + itemdata.rewardcost[effectivechallengebonuses[j]];
                    ok &= costs[i ^ 1 << j] > mxtoken || (rank && effectivechallengebonuses[j] === 9);
                }
            }
            if (ok && costs[i] <= mxtoken) {
                let cs = [];
                for (let j = 0; j < effectivechallengebonuses.length; j++) {
                    if (i & 1 << j) {
                        cs.push(effectivechallengebonuses[j]);
                    }
                }
                /* 上位効力4は上位効力5の上位互換 */
                if (rank && !cs.includes(3) && cs.includes(4)) { } else {
                    challengebonusescandidates.push(cs);
                }
            }
        }
        return challengebonusescandidates;
    }
};

const mbcache = new MaximumBonuses();

const trophynum = 9;
const setchipkind = 10;
const setchipnum = 100;

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

                crown: D(0),
                crownresettime: D(0),

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
                darkgeneratorsCost: [D('1e100'), D('1e108'), D('1e127'), D('1e164'), D('1e225'), D('1e316'), D('1e443'), D('1e612')],
                darklevel: D(0),

                lightmoney:　D(0),
                lightgenerators: new Array(8).fill(D(0)),
                lightgeneratorsBought: new Array(8).fill(D(0)),
                lightgeneratorsCost: [D('1e200'), D('1e216'), D('1e281'), D('1e456'), D('1e825'), D('1e1496'), D('1e2601'), D('1e4296')],

                tickspeed: 1000,
                accelevel: 0,
                accelevelused: 0,

                onchallenge: false,
                challenges: new Array(8).fill(false),
                challengecleared: [],
                challengebonuses: new Array(15).fill(false),

                rankchallengecleared: [],
                rankchallengebonuses: new Array(15).fill(false),

                trophies: new Array(trophynum).fill(false),
                smalltrophies: new Array(100).fill(false),
                smalltrophies2nd: new Array(100).fill(false),

                levelitems: new Array(5).fill(0),
                levelitembought: 0,

                remember: 0,
                rememberspent: 0,

                chip: new Array(setchipkind).fill(0),
                setchip: new Array(setchipnum).fill(0),
                statue: new Array(setchipkind).fill(0),

                worldpipe: new Array(10).fill(null).map(() => 0),
            };
        };
        this.player = initialData();
        this.players = new Array(10).fill().map(() => initialData());
        this.highest = 0;
        this.commonmult = D(1);
        this.incrementalmults = new Array(8).fill(D(1));
        this.multbyac = D(1);
        this.memory = 0;
        this.smallmemory = 0;
        this.smallmemories = new Array(10).fill(0);
        this.eachpipedsmallmemory = new Array(10).fill(null).map(() => 0);
        this.pipedsmallmemory = 0;
        this.worldopened = new Array(10).fill().map(() => false);
        this.chipused = new Array(setchipkind).fill(0);
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

            crown: D(playerData.crown ?? 0),
            crownresettime: D(playerData.crownresettime ?? 0),

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
            darklevel: D(playerData.darklevel),

            lightmoney: D(playerData.lightmoney ?? 0),
            lightgenerators: playerData.lightgenerators.map(D),
            lightgeneratorsBought: playerData.lightgeneratorsBought.map(D),
            lightgeneratorsCost: playerData.lightgeneratorsCost.map(D),


            tickspeed: parseFloat(playerData.tickspeed),
            accelevel: playerData.accelevel ?? 0,
            accelevelused: playerData.accelevelused ?? 0,

            onchallenge: playerData.onchallenge ?? false,
            challenges: numarr2boolarr(playerData.challenges, 8) ?? new Array(8).fill(false),
            challengecleared: playerData.challengecleared ?? [],
            challengebonuses: numarr2boolarr(playerData.challengebonuses, 15) ?? new Array(15).fill(false),

            rankchallengecleared: playerData.rankchallengecleared ?? [],
            rankchallengebonuses: numarr2boolarr(playerData.rankchallengebonuses, 15) ?? new Array(15).fill(false),

            trophies: playerData.trophies ?? new Array(trophynum).fill(false),
            smalltrophies: playerData.smalltrophies ?? new Array(100).fill(false),
            smalltrophies2nd: playerData.smalltrophies2nd ?? new Array(100).fill(false),

            levelitems: playerData.levelitems ?? new Array(5).fill(0),
            levelitembought: playerData.levelitembought ?? 0,

            remember: playerData.remember ?? 0,
            rememberspent: playerData.rememberspent ?? 0,

            chip: playerData.chip ?? new Array(setchipkind).fill(0),
            setchip: playerData.setchip ?? new Array(setchipnum).fill(0),
            statue: playerData.statue ?? new Array(setchipkind).fill(0),

            worldpipe: playerData.worldpipe ?? new Array(10).fill(null).map(() => 0),
        };
        this.checkTrophies();
        this.checkMemories();
        this.checkSmallMemories();
        this.checkUsedChips();
        this.checkWorlds();
        this.updateTickspeed();
        this.checkPipedSmallMemories();
        for (let i = 0; i < 8; i++) this.calcGeneratorCost(i, this.player.generatorsBought[i], true);
        for (let i = 0; i < 8; i++) this.calcAcceleratorCost(i, this.player.acceleratorsBought[i], true);
        for (let i = 0; i < 8; i++) this.calcDarkGeneratorCost(i, this.player.darkgeneratorsBought[i], true);
        for (let i = 0; i < 8; i++) this.calcLightGeneratorCost(i, this.player.lightgeneratorsBought[i], true);
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

    calcCommonMult() {
        let mult = D(1);
        if (!this.isChallengeActive(7)) {
            const cap = D(100).mul(this.player.levelitems[2] * (1 + this.player.setchip[28] * 0.3) + 1);
            mult = mult.mul(this.softCap(this.player.levelresettime.add(1), cap));
        }

        if (this.isChallengeBonusActive(3)) mult = mult.mul(D(2));
        if (this.isRankChallengeBonusActive(3)) mult = mult.mul(D(3));

        mult = mult.mul(1 + this.smallmemory * 0.01 + this.memory * 0.25);
        if (this.isRankChallengeBonusActive(11))
            mult = mult.mul(D(2).pow(D(this.memory).div(12)));

        mult = mult.mul(1 + Math.sqrt(this.pipedsmallmemory));

        if (this.player.onchallenge && this.isRankChallengeBonusActive(4)) {
            let cnt = 0;
            this.player.challenges.forEach(b => cnt += b ? 1 : 0);
            mult = mult.mul(1 + cnt * 0.25);
        }

        if (this.player.darkmoney.gte(1))
            mult = mult.mul(D(this.player.darkmoney.add(10).log10()).pow(1 + this.player.setchip[40] * 0.1));

        if (this.isRankChallengeBonusActive(9)) {
            mult = mult.mul(this.multbyac);
            if (this.multbyac.gt(1)) mult = mult.mul(this.multbyac);
        }

        mult = mult.mul(1 + this.player.setchip[0] * 0.1);

        let camp = this.player.accelevelused;
        let d = new Date();
        // if (d.getMonth() == 0 && d.getDate() <= 7) camp = camp + 1;
        // if (d.getMonth() == 1 && 8 <= d.getDate() && d.getDate() <= 14) camp = camp + 1;
        // if ((d.getMonth() == 1 && 25 <= d.getDate()) || ((d.getMonth() == 2 && d.getDate() <= 3))) camp = camp + 1;
        if ((d.getMonth() == 6 && 27 <= d.getDate()) || ((d.getMonth() == 7 && d.getDate() < 27))) camp = camp + 2;
        if (camp > 6) camp = 6;
        mult = mult.mul(1 + 4 * camp);


        this.commonmult = mult;
    };

    calcBasicIncrementMult(i, highest) {
        let mult = this.commonmult;
        if (!this.isChallengeActive(2)) {
            if ((i < highest || this.isChallengeBonusActive(2)) && this.player.generatorsBought[i].gt(0)) {
                let mm = this.player.generatorsBought[i];
                if (this.isChallengeBonusActive(11)) mm = mm.mul(mm.add(2).log2());
                mult = mult.mul(mm);
            }
        }

        if (i == 0 && this.isChallengeBonusActive(7)) {
            if (this.isRankChallengeBonusActive(7))
                mult = mult.mul(this.strongSoftcap(this.player.maxlevelgained, D(100000)));
            else
                mult = mult.mul(this.player.maxlevelgained.min(100000));
        }

        if (this.player.darkgenerators[i].gte(1))
            mult = mult.mul(D(i + 2 + this.player.darkgenerators[i].log10()).pow(1 + this.player.setchip[i + 32] * 0.25));

        mult = mult.mul(1 + this.player.setchip[i + 1] * 0.5);

        this.incrementalmults[i] = mult;
    };

    calcIncrementMult(mu, i, to) {
        let mult = mu.mul(this.incrementalmults[i]);
        if (!this.isChallengeActive(4))
            mult = mult.mul(D(10).pow((i + 1) * (i - to)));
        let lv = D(this.player.level.pow(1 + 0.5 * this.player.setchip[19]).add(2).log2());
        let rk = this.player.rank.add(2).div(262142).log2();
        rk += D(this.player.rank.add(2).log2()).log2() * this.player.setchip[23];
        mult = mult.mul(D(lv.pow((i - to) * (1 + Math.max(rk, 0) * 0.05))));
        return mult;
    };

    calcGeneratorExpr(mu = D(1)) {
        this.calcCommonMult();
        let highest = 0;
        for (let i = 0; i < 8; i++) if (this.player.generators[i].gt(0)) highest = i;
        for (let i = 0; i < 8; i++) this.calcBasicIncrementMult(i, highest);
        let g = Array.from(new Array(9), (_, i) => new Array(Math.max(0, highest + 2 - i)).fill(D(0)));
        g[0][0] = this.player.money;
        for (let i = 0; i <= highest; i++) g[i + 1][0] = this.player.generators[i];
        for (let i = highest + 1; i-- > 0;) {
            if (!this.isChallengeBonusActive(13)) {
                const to = this.player.generatorsMode[i];
                const mult = this.calcIncrementMult(mu, i, to);
                g[i + 1].forEach((gg, j) => g[to][j + 1] = g[to][j + 1].add(gg.mul(mult)));
            } else if (this.isChallengeActive(3)) {
                const to = 0;
                const mult = this.calcIncrementMult(mu, i, to).mul(i + 1);
                g[i + 1].forEach((gg, j) => g[to][j + 1] = g[to][j + 1].add(gg.mul(mult)));
            } else {
                for (let to = 0; to <= i; to++) {
                    const mult = this.calcIncrementMult(mu, i, to);
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
            if (i == 1 ? this.isChallengeBonusActive(10) : this.isRankChallengeBonusActive(6))
                if (this.isRankChallengeBonusActive(10))
                    mult = mult.add(this.player.acceleratorsBought[i].pow_base(2));
                else
                    mult = mult.add(this.player.acceleratorsBought[i]);
            mult = mult.mul(D(1.5).pow(this.player.setchip[i + 10]));
            mult = mult.mul(1 + this.eachpipedsmallmemory[1] * 0.2);
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
        const darkmult = this.softCap(this.player.darklevel.add(1), D(1e3));
        for (let i = highest + 1; i-- > 0;) {
            let mult = mu.mul(this.player.lightgenerators[i].add(1));
            mult = mult.mul(darkmult);
            mult = mult.mul(1 + this.player.setchip[41 + i] * 0.25);
            mult = mult.mul(1 + this.eachpipedsmallmemory[5] * 0.2);
            d[i + 1].forEach((dd, j) => d[i][j + 1] = d[i][j + 1].add(dd.mul(mult)));
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
    basetick() {
        const challengebonusescount = this.player.challengebonuses.reduce((x, y) => x + (y ? 1 : 0), 0);
        return 1000 * (1 + 0.5 * this.player.accelevelused) - this.player.setchip[9] * 50 - this.player.levelitems[1] * challengebonusescount * (1 + this.player.setchip[27] * 0.5);
    };
    updateTickspeed() {
        const amult = this.isChallengeBonusActive(6) ? (this.isRankChallengeBonusActive(10) ? this.player.acceleratorsBought[0].pow_base(2) : this.player.acceleratorsBought[0].add(1)) : D(1);
        let acnum = this.player.accelerators[0].mul(D(1.5).pow(this.player.setchip[10]));
        if (this.isRankChallengeBonusActive(13)) {
            for (let i = 1; i < 8; i++) acnum = acnum.mul(this.player.accelerators[i].add(1));
        }
        this.player.tickspeed = this.basetick() / acnum.add(10).mul(amult).log10();
        this.multbyac = D(50).div(this.player.tickspeed);
    };
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
        const val = D(11 + this.player.setchip[31]).pow(D(num).log10());
        this.updateGenerators(val);
        this.updateAccelerators(val);
    };
    spendBrightness(num) {
        if (this.player.brightness < num) return;
        this.player.brightness -= num;
        const val = D(11 + this.player.setchip[50]).pow(D(num * 100).log10());
        const vald = D(10 + this.player.setchip[51]*0.25).pow(D(num).log10());
        this.updateGenerators(val);
        this.updateAccelerators(val);
        this.updateDarkGenerators(vald);
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
    calcGeneratorCost(index, bought, update = false) {
        const mult = bought.neq(0) && this.isChallengeActive(1) ? 2 : 1;
        let p = (index === 0 ? bought : bought.add(index + 1).mul(index + 1)).mul(mult);
        p = p.sub(this.eachpipedsmallmemory[0] * 0.2);
        const cost = p.pow_base(10);
        if (update) this.player.generatorsCost[index] = cost;
        return cost;
    };
    buyGenerator(index) {
        if (!this.isGeneratorBuyable(index)) return false;
        this.player.money = this.player.money.sub(this.player.generatorsCost[index]);
        this.player.generators[index] = this.player.generators[index].add(1);
        this.player.generatorsBought[index] = this.player.generatorsBought[index].add(1);
        this.calcGeneratorCost(index, this.player.generatorsBought[index], true);
        return true;
    };

    isAcceleratorOpened(index) {
        if (index >= 1 && this.player.levelresettime.lte(0)) return false;
        if (index >= 2 && this.player.levelitems[3] + 1 < index) return false;
        return true;
    };
    isAcceleratorBuyable(index) {
        if (this.isChallengeActive(5)) return false;
        if (!this.isAcceleratorOpened(index)) return false;
        return this.player.money.gte(this.player.acceleratorsCost[index]);
    };
    calcAcceleratorCost(index, bought, update = false) {
        let p = bought.add(1);
        p = p.mul(p.add(1)).div(2);
        p = p.mul(index === 0 ? 1 : D(10).mul(D(2).pow(index - 1)));
        p = p.sub(this.eachpipedsmallmemory[3] * 0.2 * (index + 1));
        const cost = p.pow_base(10);
        if (update) this.player.acceleratorsCost[index] = cost;
        return cost;
    };
    buyAccelerator(index) {
        if (!this.isAcceleratorBuyable(index)) return false;
        this.player.money = this.player.money.sub(this.player.acceleratorsCost[index]);
        this.player.accelerators[index] = this.player.accelerators[index].add(1);
        this.player.acceleratorsBought[index] = this.player.acceleratorsBought[index].add(1);
        this.calcAcceleratorCost(index, this.player.acceleratorsBought[index], true);
        return true;
    };

    isDarkGeneratorBuyable(index) {
        return this.player.money.gte(this.player.darkgeneratorsCost[index]);
    };
    calcDarkGeneratorCost(index, bought, update = false) {
        let p = 100 + (index == 0 ? 0 : (index + 1) * (index + 1) * (index + 1));
        let q = bought.mul(index + 1).mul(index + 1);
        q = q.add(p);
        q = q.sub(this.eachpipedsmallmemory[8] * 0.02 * (index + 1) * (index + 1));
        const cost = D(10).pow(q);
        if (update) this.player.darkgeneratorsCost[index] = cost;
        return cost;
    };
    buyDarkGenerator(index) {
        if (!this.isDarkGeneratorBuyable(index)) return false;
        this.player.money = this.player.money.sub(this.player.darkgeneratorsCost[index]);
        this.player.darkgenerators[index] = this.player.darkgenerators[index].add(1);
        this.player.darkgeneratorsBought[index] = this.player.darkgeneratorsBought[index].add(1);
        this.calcDarkGeneratorCost(index, this.player.darkgeneratorsBought[index], true);
        return true;
    };

    isLightGeneratorBuyable(index) {
        return this.player.money.gte(this.player.lightgeneratorsCost[index]);
    };
    calcLightGeneratorCost(index, bought, update = false) {
        let p = 200 + (index === 0 ? 0 : (index + 1) * (index + 1) * (index + 1) * (index + 1));
        let q = bought.mul(index + 1).mul(index + 1).mul(index + 1);
        q = q.add(p);
        const cost = D(10).pow(q);
        if (update) this.player.lightgeneratorsCost[index] = cost;
        return cost;
    };
    buyLightGenerator(index) {
        if (!this.isLightGeneratorBuyable(index)) return false;
        this.player.money = this.player.money.sub(this.player.lightgeneratorsCost[index]);
        this.player.lightgenerators[index] = this.player.lightgenerators[index].add(1);
        this.player.lightgeneratorsBought[index] = this.player.lightgeneratorsBought[index].add(1);
        this.calcLightGeneratorCost(index, this.player.lightgeneratorsBought[index], true);
        return true;
    };

    isRewardToggleable(index) {
        return this.player.challengebonuses[index] || (this.player.token >= itemdata.rewardcost[index]);
    };
    toggleReward(index) {
        if (this.isRewardToggleable(index)) {
            if (this.player.challengebonuses[index])
                this.player.token += itemdata.rewardcost[index];
            else
                this.player.token -= itemdata.rewardcost[index];
            this.player.challengebonuses[index] = !this.player.challengebonuses[index];
            this.updateTickspeed();
        }
    };
    isRankRewardToggleable(index) {
        return this.player.rankchallengebonuses[index] || (this.player.ranktoken >= itemdata.rewardcost[index]);
    };
    toggleRankReward(index) {
        if (this.isRankRewardToggleable(index)) {
            if (this.player.rankchallengebonuses[index])
                this.player.ranktoken += itemdata.rewardcost[index];
            else
                this.player.ranktoken -= itemdata.rewardcost[index];
            this.player.rankchallengebonuses[index] = !this.player.rankchallengebonuses[index];
            this.updateTickspeed();
        }
    };

    isLevelitemBuyable(index) {
        if (!this.player.rankresettime.gt(0)) return false;
        const cost = this.calcLevelitemCost(index);
        return !(this.player.level.lt(cost) || this.player.levelitems[index] >= 5);
    };
    calcLevelitemCost(index) {
        const d = index + 1;
        const cost = itemdata.levelitemcost[index].pow(this.player.levelitems[index] + 1);
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

    calcGainLevel(x) {
        const money = x === undefined ? this.player.money : x;
        const dividing = Math.max(1, 19 - this.player.rank.add(2).log2());
        let mny = money.log10() - 17;
        mny = D(mny).pow(this.player.setchip[18]);
        let gainlevel = D(money.mul(mny).log10()).div(dividing).pow_base(2);

        const glmin = D(18).div(dividing).pow_base(2);
        const glmax = this.player.maxlevelgained.div(2);

        if (!glmin.add(0.1).gte(glmax)) {
            if (gainlevel.lt(glmax)) {
                let persent = D(1).sub(gainlevel.sub(glmin).div(glmax.sub(glmin)));
                persent = persent.pow(1 + this.player.levelitems[0] * (1 + this.player.setchip[26] * 2));
                persent = D(1).sub(persent);
                if (gainlevel.neq(glmin) && persent.lt('1e-5')) {
                    gainlevel = gainlevel.mul(1 + this.player.levelitems[0] * (1 + this.player.setchip[26] * 2));
                } else {
                    gainlevel = glmax.sub(glmin).mul(persent).add(glmin);
                }
            }
        }
        gainlevel = gainlevel.round().max(1);
        gainlevel = gainlevel.mul(1 + this.eachpipedsmallmemory[2] * 0.2);
        if (this.isChallengeBonusActive(12)) gainlevel = gainlevel.mul(2);
        return gainlevel;
    };
    calcGainRank(x) {
        const money = x === undefined ? this.player.money : x;
        let dv = 36 - 0.25 * this.countRemembers() - 1.2 * this.player.levelitems[4] * (1 + 0.2 * this.player.setchip[29]);
        dv = Math.max(dv, 6);
        dv = dv - this.player.crown.add(2).log2() * 0.1;
        dv = Math.max(dv, 3);
        let gainrank = D(money.log10()).div(dv).pow_base(2).round();
        if (this.isRankChallengeBonusActive(12)) gainrank = gainrank.mul(3);
        gainrank = gainrank.mul(1 + this.player.setchip[22] * 0.5);
        gainrank = gainrank.mul(1 + this.eachpipedsmallmemory[4] * 0.2);
        return gainrank;
    };
    calcGainCrown(x) {
        const money = x === undefined ? this.player.money : x;
        let dv = 72;
        return D(2).pow(money.log10() / dv).round();
    };

    resetLevel(_force, exit, challenge) {
        const gainlevel = this.calcGainLevel();
        const gainlevelreset = this.player.rankresettime.add(1).mul(1 + this.player.setchip[20]).mul(D(exit ? 0 : this.isChallengeBonusActive(8) ? 2 : 1));

        if (this.player.onchallenge) {
            this.player.onchallenge = false;
            this.player.token = this.player.token + 1;
            this.player.challengecleared.push(this.calcChallengeId());
        } else if (challenge) {
            this.player.onchallenge = true;
            if (this.player.challenges[3])
                this.player.generatorsMode = new Array(8).fill(0);
        }

        this.player.money = D(1);
        this.player.level = this.player.level.add(exit ? D(0) : gainlevel);
        this.player.levelresettime = this.player.levelresettime.add(gainlevelreset);
        this.player.maxlevelgained = this.player.maxlevelgained.max(exit ? D(0) : gainlevel);

        this.player.generators = new Array(8).fill(D(0));
        this.player.generatorsBought = new Array(8).fill(D(0));
        for (let i = 0; i < 8; i++) this.calcGeneratorCost(i, this.player.generatorsBought[i], true);

        this.player.accelerators = new Array(8).fill(D(0));
        this.player.acceleratorsBought = new Array(8).fill(D(0));
        for (let i = 0; i < 8; i++) this.calcAcceleratorCost(i, this.player.acceleratorsBought[i], true);

        this.player.tickspeed = 1000;

        if (this.isChallengeBonusActive(0)) this.player.money = D(10001);
        if (this.isChallengeBonusActive(1)) this.player.accelerators[0] = D(10);
        if (this.isRankChallengeBonusActive(0)) this.player.money = this.player.money.add(D('1e9'));
        if (this.isRankChallengeBonusActive(1)) this.player.accelerators[0] = this.player.accelerators[0].add(256);
    };

    resetRankborder() {
        return D(10).pow((this.isChallengeActive(0) ? 96 : 72) - Math.min(this.countRemembers() / 2.0, 36));
    };
    resetCrownborder() {
        return D('1e216');
    };

    calcChallengeId() {
        let challengeid = 0;
        for (let i = 0; i < 8; i++)
            challengeid = challengeid * 2 + (this.player.challenges[i] ? 1 : 0);
        return challengeid;
    };

    startChallenge() {
        this.resetLevel(true, true, true);
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
    openPipe(i) {
        let maxpipe = 1;
        if (this.player.trophies[7]) maxpipe = 2;
        if (this.player.worldpipe[i] >= maxpipe) return;
        let havepipe = Math.floor((this.smallmemory - 72) / 3);
        for (let j = 0; j < 10; j++) {
            havepipe -= this.player.worldpipe[j];
        }
        if (havepipe > 0) this.player.worldpipe[i] += 1;
    };

    isStatueBuildable(i) {
        let cost = this.calcStatueCost(i);
        if (this.player.chip[i] < cost) return false;
        return true;
    };
    calcStatueCost(i){
        return (this.player.statue[i] + 1) * 10000;
    };
    buildStatue(i){
        let cost = this.calcStatueCost(i);
        if (this.player.chip[i] < cost) return;
        this.player.chip[i] -= cost;
        this.player.statue[i] += 1;
    };

    checkTrophies() {
        if (this.player.levelresettime.gt(0)) this.player.trophies[0] = true;
        if (this.player.rankresettime.gt(0)) this.player.trophies[1] = true;
        if (this.player.shine > 0) this.player.trophies[2] = true;
        if (this.player.challengecleared.includes(238) || this.player.challengecleared.length >= 100) this.player.trophies[3] = true;
        if (this.player.brightness > 0) this.player.trophies[5] = true;
        if (this.player.remember > 0) this.player.trophies[6] = true;
        if (this.world == 0 && this.countRemembers() > 0) this.player.trophies[6] = true;
        if (this.player.crownresettime.gt(0)) this.player.trophies[7] = true;
        if (this.player.lightgenerators[0].gt(0)) this.player.trophies[8] = true;

        if (this.player.money.gt(0)) this.player.smalltrophies[0] = true;
        if (this.player.money.gt(777)) this.player.smalltrophies[1] = true;
        if (this.player.money.gt(7777777)) this.player.smalltrophies[2] = true;
        if (this.player.money.gt('1e19')) this.player.smalltrophies[3] = true;
        if (this.player.money.gt('1e36')) this.player.smalltrophies[4] = true;
        if (this.player.money.gt('1e77')) this.player.smalltrophies[5] = true;
        if (this.player.money.gt('1e81')) this.player.smalltrophies[6] = true;
        if (this.player.money.gt('1e303')) this.player.smalltrophies[7] = true;
        if (this.player.generatorsBought[0].gt(0)) this.player.smalltrophies[8] = true;
        if (this.player.generatorsBought[1].gt(0)) this.player.smalltrophies[9] = true;
        if (this.player.generatorsBought[2].gt(0)) this.player.smalltrophies[10] = true;
        if (this.player.generatorsBought[3].gt(0)) this.player.smalltrophies[11] = true;
        if (this.player.generatorsBought[4].gt(0)) this.player.smalltrophies[12] = true;
        if (this.player.generatorsBought[5].gt(0)) this.player.smalltrophies[13] = true;
        if (this.player.generatorsBought[6].gt(0)) this.player.smalltrophies[14] = true;
        if (this.player.generatorsBought[7].gt(0)) this.player.smalltrophies[15] = true;
        if (this.player.acceleratorsBought[0].gt(0)) this.player.smalltrophies[16] = true;
        if (this.player.acceleratorsBought[1].gt(0)) this.player.smalltrophies[17] = true;
        if (this.player.acceleratorsBought[2].gt(0)) this.player.smalltrophies[18] = true;
        if (this.player.acceleratorsBought[3].gt(0)) this.player.smalltrophies[19] = true;
        if (this.player.acceleratorsBought[4].gt(0)) this.player.smalltrophies[20] = true;
        if (this.player.acceleratorsBought[5].gt(0)) this.player.smalltrophies[21] = true;
        if (this.player.acceleratorsBought[6].gt(0)) this.player.smalltrophies[22] = true;
        if (this.player.acceleratorsBought[7].gt(0)) this.player.smalltrophies[23] = true;
        if (this.player.levelresettime.gt(200)) this.player.smalltrophies[24] = true;
        if (this.player.levelresettime.gt(999)) this.player.smalltrophies[25] = true;
        if (this.player.challengecleared.includes(128)) this.player.smalltrophies[26] = true;
        if (this.player.challengecleared.includes(64)) this.player.smalltrophies[27] = true;
        if (this.player.challengecleared.includes(32)) this.player.smalltrophies[28] = true;
        if (this.player.challengecleared.includes(16)) this.player.smalltrophies[29] = true;
        if (this.player.challengecleared.includes(8)) this.player.smalltrophies[30] = true;
        if (this.player.challengecleared.includes(4)) this.player.smalltrophies[31] = true;
        if (this.player.challengecleared.includes(2)) this.player.smalltrophies[32] = true;
        if (this.player.challengecleared.includes(1)) this.player.smalltrophies[33] = true;
        if (this.player.challengecleared.length >= 32) this.player.smalltrophies[34] = true;
        if (this.player.challengecleared.length >= 64) this.player.smalltrophies[35] = true;
        if (this.player.challengecleared.length >= 96) this.player.smalltrophies[36] = true;
        if (this.player.challengecleared.length >= 128) this.player.smalltrophies[37] = true;
        if (this.player.challengecleared.length >= 160) this.player.smalltrophies[38] = true;
        if (this.player.challengecleared.length >= 192) this.player.smalltrophies[39] = true;
        if (this.player.challengecleared.length >= 224) this.player.smalltrophies[40] = true;
        if (this.player.challengecleared.length >= 255) this.player.smalltrophies[41] = true;
        if (this.player.rankresettime.gt(1)) this.player.smalltrophies[42] = true;
        if (this.player.rankresettime.gt(4)) this.player.smalltrophies[43] = true;
        if (this.player.rankresettime.gt(9)) this.player.smalltrophies[44] = true;
        if (this.player.rankresettime.gt(99)) this.player.smalltrophies[45] = true;
        if (this.player.rankresettime.gt(999)) this.player.smalltrophies[46] = true;
        if (this.player.levelitembought >= 4) this.player.smalltrophies[47] = true;
        if (this.player.levelitembought >= 108) this.player.smalltrophies[48] = true;
        if (this.player.levelitembought >= 256) this.player.smalltrophies[49] = true;
        if (this.player.levelitembought >= 1728) this.player.smalltrophies[50] = true;
        if (this.player.levelitembought >= 12500) this.player.smalltrophies[51] = true;
        if (this.player.shine >= 100) this.player.smalltrophies[52] = true;
        if (this.player.shine >= 1000) this.player.smalltrophies[53] = true;
        if (this.player.shine >= 10000) this.player.smalltrophies[54] = true;
        if (this.player.shine >= 100000) this.player.smalltrophies[55] = true;
        if (this.player.shine >= 1000000) this.player.smalltrophies[56] = true;
        if (this.player.shine >= 10000000) this.player.smalltrophies[57] = true;
        // if (this.exported.length >= 2) this.player.smalltrophies[58] = true;
        // if (this.player.tweeting.length >= 2) this.player.smalltrophies[59] = true;
        if (this.player.darkgenerators[0].gte(1)) this.player.smalltrophies[60] = true;
        if (this.player.darkgenerators[1].gte(1)) this.player.smalltrophies[61] = true;
        if (this.player.darkgenerators[2].gte(1)) this.player.smalltrophies[62] = true;
        if (this.player.darkgenerators[3].gte(1)) this.player.smalltrophies[63] = true;
        if (this.player.darkgenerators[4].gte(1)) this.player.smalltrophies[64] = true;
        if (this.player.darkgenerators[5].gte(1)) this.player.smalltrophies[65] = true;
        if (this.player.darkgenerators[6].gte(1)) this.player.smalltrophies[66] = true;
        if (this.player.darkgenerators[7].gte(1)) this.player.smalltrophies[67] = true;
        if (this.player.rankchallengecleared.length >= 32) this.player.smalltrophies[68] = true;
        if (this.player.rankchallengecleared.length >= 64) this.player.smalltrophies[69] = true;
        if (this.player.rankchallengecleared.length >= 96) this.player.smalltrophies[70] = true;
        if (this.player.rankchallengecleared.length >= 128) this.player.smalltrophies[71] = true;
        if (this.player.rankchallengecleared.length >= 160) this.player.smalltrophies[72] = true;
        if (this.player.rankchallengecleared.length >= 192) this.player.smalltrophies[73] = true;
        if (this.player.rankchallengecleared.length >= 224) this.player.smalltrophies[74] = true;
        if (this.player.rankchallengecleared.length >= 255) this.player.smalltrophies[75] = true;
        if (this.player.brightness >= 10) this.player.smalltrophies[76] = true;
        if (this.player.brightness >= 100) this.player.smalltrophies[77] = true;
        if (this.player.brightness >= 1000) this.player.smalltrophies[78] = true;
        if (this.player.brightness >= 10000) this.player.smalltrophies[79] = true;
        if (this.player.darkmoney.gte(1)) this.player.smalltrophies[80] = true;
        if (this.player.darkmoney.gte(777)) this.player.smalltrophies[81] = true;
        if (this.player.darkmoney.gte(7777777)) this.player.smalltrophies[82] = true;
        if (this.player.darkmoney.gte('1e18')) this.player.smalltrophies[83] = true;
        if (this.player.darkmoney.gte('1e72')) this.player.smalltrophies[84] = true;
        if (this.player.chip[0] > 0) this.player.smalltrophies[85] = true;
        if (this.player.chip[0] >= 210) this.player.smalltrophies[86] = true;
        if (this.player.chip[0] >= 1275) this.player.smalltrophies[87] = true;
        if (this.player.chip[1] > 0) this.player.smalltrophies[88] = true;
        if (this.player.chip[1] >= 210) this.player.smalltrophies[89] = true;
        if (this.player.chip[1] >= 1275) this.player.smalltrophies[90] = true;
        if (this.player.chip[2] > 0) this.player.smalltrophies[91] = true;
        if (this.player.chip[2] >= 210) this.player.smalltrophies[92] = true;
        if (this.player.chip[2] >= 1275) this.player.smalltrophies[93] = true;
        if (this.player.chip[3] > 0) this.player.smalltrophies[94] = true;
        if (this.player.chip[3] >= 210) this.player.smalltrophies[95] = true;
        if (this.player.chip[3] >= 1275) this.player.smalltrophies[96] = true;
        if (this.player.darklevel.greaterThan(0)) this.player.smalltrophies[97] = true;
        if (this.player.darklevel.greaterThan('1e3')) this.player.smalltrophies[98] = true;
        if (this.player.darklevel.greaterThan('1e10')) this.player.smalltrophies[99] = true;

        if (this.player.crownresettime.gt(0)) {
            if (this.player.crownresettime.gt(0)) this.player.smalltrophies2nd[0] = true;
            if (this.player.crownresettime.gte(5)) this.player.smalltrophies2nd[1] = true;
            if (this.player.crownresettime.gte(20)) this.player.smalltrophies2nd[2] = true;
            if (this.player.crownresettime.gte(100)) this.player.smalltrophies2nd[3] = true;
            if (this.player.accelevel >= 1) this.player.smalltrophies2nd[4] = true;
            if (this.player.accelevel >= 3) this.player.smalltrophies2nd[5] = true;
            if (this.player.accelevel >= 6) this.player.smalltrophies2nd[6] = true;
            if (this.player.accelevel >= 10) this.player.smalltrophies2nd[7] = true;
            if (this.player.rank.gt('1e8')) this.player.smalltrophies2nd[8] = true;
            if (this.player.rank.gt('1e10')) this.player.smalltrophies2nd[9] = true;
            if (this.player.rank.gt('1e12')) this.player.smalltrophies2nd[10] = true;
            if (this.player.lightgenerators[0].gte(1)) this.player.smalltrophies2nd[11] = true;
            if (this.player.lightgenerators[1].gte(1)) this.player.smalltrophies2nd[12] = true;
            if (this.player.lightgenerators[2].gte(1)) this.player.smalltrophies2nd[13] = true;
            if (this.player.lightgenerators[3].gte(1)) this.player.smalltrophies2nd[14] = true;
            if (this.player.lightgenerators[4].gte(1)) this.player.smalltrophies2nd[15] = true;
            if (this.player.lightgenerators[5].gte(1)) this.player.smalltrophies2nd[16] = true;
            if (this.player.lightgenerators[6].gte(1)) this.player.smalltrophies2nd[17] = true;
            if (this.player.lightgenerators[7].gte(1)) this.player.smalltrophies2nd[18] = true;
            if (this.player.chip[4]>0) this.player.smalltrophies[19] = true;
            if (this.player.chip[4]>=210) this.player.smalltrophies[20] = true;
            if (this.player.chip[4]>=1275) this.player.smalltrophies[21] = true;
            if (this.player.statue[0]>=10) this.player.smalltrophies[22] = true;
            if (this.player.statue[1]>=10) this.player.smalltrophies[23] = true;
            if (this.player.statue[2]>=10) this.player.smalltrophies[24] = true;
            if (this.player.statue[3]>=10) this.player.smalltrophies[25] = true;
        }
    };
    checkMemories() {
        this.memory = 0;
        for (let i = 0; i < 10; i++) {
            if (this.world == i) continue;
            this.memory += this.players[i].trophies.reduce((x, y) => x + (y ? 1 : 0), 0);
        }
    };
    checkPipedSmallMemories() {
        let sum = 0;
        for (let i = 0; i < 10; i++) {
            if (this.players[i].worldpipe[this.world] >= 1) {
                let cnt = this.smallmemories[i];
                cnt -= 75;
                cnt *= this.players[i].worldpipe[this.world];
                this.eachpipedsmallmemory[i] = cnt;
                sum += cnt;
            } else {
                this.eachpipedsmallmemory[i] = 0;
            }
        }
        this.pipedsmallmemory = sum;
    };
    checkSmallMemories() {
        for (let i = 0; i < 10; i++) {
            this.smallmemories[i] = this.players[i].smalltrophies.reduce((x, y) => x + (y ? 1 : 0), 0);
            this.smallmemories[i] += this.players[i].smalltrophies2nd.reduce((x, y) => x + (y ? 1 : 0), 0);
        }
        this.smallmemory = this.smallmemories[this.world];
    };
    countRemembers() {
        let cnt = 0;
        for (let i = this.world + 1; i < 10; i++)
            cnt += this.players[i].remember;
        return cnt;
    };
    checkWorlds() {
        this.worldopened[0] = true;
        if (D(this.players[0].crownresettime).gt(0)) {
            for (let i = 1; i < 10; i++) {
                this.worldopened[i] = true;
            }
        }
        if (this.players[0].challengecleared.includes(238)) this.worldopened[1] = true;
        if (this.players[0].challengecleared.length >= 100) this.worldopened[2] = true;
        if (this.players[0].rankchallengecleared.length >= 16) this.worldopened[3] = true;
        if (this.players[0].levelitembought >= 12500) this.worldopened[4] = true;
        if (D(this.players[0].darkmoney).gte('1e8')) this.worldopened[5] = true;
        if (D(this.players[0].rank).gte(262142)) this.worldopened[6] = true;
        if (this.players[0].rankchallengecleared.includes(238)) this.worldopened[7] = true;
        if (this.players[0].challengecleared.length >= 200) this.worldopened[8] = true;
        if (this.players[0].rankchallengecleared.length >= 200) this.worldopened[9] = true;
    };
    toggleChip(i) {
        let oldchip = this.player.setchip[i];
        for (let j = oldchip + 1; j <= 4; j++) if (this.configChip(i, j)) return true;
        for (let j = 0; j < oldchip; j++) if (this.configChip(i, j)) return true;
        return false;
    };
    configChip(i, j) {
        if (this.player.setchip[i] == j) return false;
        if (this.player.chip[j - 1] <= this.chipused[j - 1]) return false;
        let oldchip = this.player.setchip[i] - 1;
        if (oldchip != -1) this.player.chip[oldchip] = this.player.chip[oldchip] + this.chipused[oldchip];
        this.player.setchip[i] = j;
        if (j != 0) this.player.chip[j - 1] = this.player.chip[j - 1] - (this.chipused[j - 1] + 1);
        this.checkUsedChips();
        return true;
    };
    checkUsedChips() {
        this.chipused.fill(0);
        for (let v of this.player.setchip) {
            if (v != 0) this.chipused[v - 1] = this.chipused[v - 1] + 1;
        }
    };
    workTime(val) {
        if (0 <= val && val <= this.player.accelevel) {
            this.player.accelevelused = val;
        }
    };

    searchLowerBound(value, l, target) {
        const f = x => {
            if (target === 'levelreset') {
                return this.calcGainLevel(x);
            } else if (target === 'rankreset') {
                return this.calcGainRank(x);
            } else if (target === 'crownreset') {
                return this.calcGainCrown(x);
            }
        };
        if (f(l).gte(value)) return l;
        let r = l.mul(l);
        let cnt = 0;
        while (f(r).lt(value)) r = r.mul(r);
        while (l.add(1).lt(r) && cnt < 60) {
            const m = r.sub(l).lt(4) ? l.add(r).div(2).floor() : l.mul(r).sqrt().floor();
            if (f(m).gte(value))
                r = m;
            else
                l = m;
            cnt += 1;
        }
        return r;
    };

    targetmoney(target, input) {
        try {
            let value = D(input);
            const hasc0 = this.isChallengeActive(0);
            if (target === 'levelreset') {
                value = value.ceil();
                return this.searchLowerBound(value, D(hasc0 ? '1e24' : '1e18'), target);
            } else if (target == 'rankreset') {
                value = value.ceil();
                return this.searchLowerBound(value, this.resetRankborder(), target);
            } else if (target == 'crownreset') {
                value = value.ceil();
                return this.searchLowerBound(value, this.resetCrownborder(), target);
            } else if (target == 'point') {
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

    calcTickfromExpr(aexpr, tick) {
        let acnum = Nig.calcAfterNtick(aexpr[0], tick).mul(D(1.5).pow(this.player.setchip[10]));;
        if (this.isRankChallengeBonusActive(13)) {
            for (let i = 1; i < 8; i++) acnum = acnum.mul(Nig.calcAfterNtick(aexpr[i], tick).add(1));
        }
        return acnum;
    }

    tick2sec(tick, update) {
        if (tick.lte(0)) return D(0);
        if (tick.eq(D('Infinity'))) return D('Infinity');
        const aexpr = this.calcAcceleratorExpr();
        const delta = D('1e-3');
        const basetick = D(this.basetick()).div(1000);
        const amult = this.isChallengeBonusActive(6) ? (this.isRankChallengeBonusActive(10) ? this.player.acceleratorsBought[0].pow_base(2) : this.player.acceleratorsBought[0].add(1)) : D(1);
        let curtick = D(0);
        let acnum = this.player.accelerators[0].mul(D(1.5).pow(this.player.setchip[10]));;
        if (this.isRankChallengeBonusActive(13)) {
            for (let i = 1; i < 8; i++) acnum = acnum.mul(this.player.accelerators[i].add(1));
        }
        let prevdt = basetick.div(acnum.add(10).mul(amult).log10());
        let sec = D(0);
        while (curtick.lt(tick)) {
            const prevtick = curtick;
            let ok = curtick.add(1);
            let ng = tick.add(1);
            let cnt = 0;
            while (ok.add(1).lt(ng) && cnt < 60) {
                const m = ng.sub(ok).lt(4) ? ok.add(ng).div(2).floor() : ok.mul(ng).sqrt().floor();
                if (basetick.div(this.calcTickfromExpr(aexpr, m).add(10).mul(amult).log10()).add(delta).gt(prevdt)) {
                    ok = m;
                } else {
                    ng = m;
                }
                cnt += 1;
            }
            curtick = ok;
            if (prevtick.eq(curtick)) break;
            const dt = basetick.div(this.calcTickfromExpr(aexpr, curtick).add(10).mul(amult).log10());
            sec = sec.add(prevdt.add(dt).div(2).mul(curtick.sub(prevtick)));
            prevdt = dt;
        }
        if (update) this.updateAccelerators(D(1), tick, aexpr);
        return sec;
    };

    calcTickandSec(tmoney, update) {
        if (this.player.money.gte(tmoney)) return { ticks: D(0), sec: D(0) };
        if (tmoney.eq(D('Infinity'))) return { ticks: D('Infinity'), sec: D('Infinity') };
        if (this.isRankChallengeBonusActive(9)) {
            const previnfo = {
                money: this.player.money,
                generators: this.player.generators.slice(),
                tickspeed: this.player.tickspeed,
                multbyac: this.multbyac,
            };
            const aexpr = this.calcAcceleratorExpr();
            const basetick = D(this.basetick());
            const amult = this.isChallengeBonusActive(6) ? (this.isRankChallengeBonusActive(10) ? this.player.acceleratorsBought[0].pow_base(2) : this.player.acceleratorsBought[0].add(1)) : D(1);
            let curtick = D(0);
            let acnum = this.player.accelerators[0].mul(D(1.5).pow(this.player.setchip[10]));;
            if (this.isRankChallengeBonusActive(13)) {
                for (let i = 1; i < 8; i++) acnum = acnum.mul(this.player.accelerators[i].add(1));
            }
            const basemu9 = D(50).div(this.basetick());
            let prevmu9 = basemu9.mul(acnum.add(10).mul(amult).log10());
            let prevmu9mul = prevmu9.mul(prevmu9.max(1));
            let highesta = 0;
            for (let i = 0; i < 8; i++) if (this.player.accelerators[i].gt(0)) highesta = i;

            while (this.player.money.lt(tmoney)) {
                const delta = prevmu9.lt('0.2') ? D('1e-2') : prevmu9.lt('2') ? D('1e-1') : prevmu9.lt('20') ? D('1') : D('10');

                let ok = curtick.add(1);
                let ng = curtick.add(2);
                let cnt = 0;
                if (highesta > 0) {
                    let curmu9 = basemu9.mul(this.calcTickfromExpr(aexpr, ng).add(10).mul(amult).log10());
                    while (curmu9.mul(curmu9.max(1)).lt(prevmu9mul.add(delta))) {
                        ng = ng.mul(ng);
                        curmu9 = basemu9.mul(this.calcTickfromExpr(aexpr, ng).add(10).mul(amult).log10());
                    }
                    while (ok.add(1).lt(ng) && cnt < 60) {
                        const m = ng.sub(ok).lt(4) ? ok.add(ng).div(2).floor() : ok.mul(ng).sqrt().floor();
                        curmu9 = basemu9.mul(this.calcTickfromExpr(aexpr, m).add(10).mul(amult).log10());
                        if (curmu9.mul(curmu9.max(1)).lt(prevmu9mul.add(delta))) {
                            ok = m;
                        } else {
                            ng = m;
                        }
                        cnt += 1;
                    }
                }

                const gexpr = this.calcGeneratorExpr();
                if (highesta === 0) {
                    ok = curtick.add(2);
                    while (Nig.calcAfterNtick(gexpr[0], ok.sub(curtick)).lt(tmoney)) {
                        ok = ok.mul(ok);
                    }
                }

                if (Nig.calcAfterNtick(gexpr[0], ok.sub(curtick)).gte(tmoney)) {
                    ng = curtick.add(1);
                    cnt = 0;
                    while (ng.add(1).lt(ok) && cnt < 60) {
                        const m = ok.sub(ng).lt(4) ? ok.add(ng).div(2).floor() : ok.mul(ng).sqrt().floor();
                        if (Nig.calcAfterNtick(gexpr[0], m.sub(curtick)).lt(tmoney)) {
                            ng = m;
                        } else {
                            ok = m;
                        }
                        cnt += 1;
                    }
                }
                const tick = ok.sub(curtick);
                this.player.money = Nig.calcAfterNtick(gexpr[0], tick);
                for (let i = 0; i < 8; i++) this.player.generators[i] = Nig.calcAfterNtick(gexpr[i + 1], tick);
                const tsnum = this.calcTickfromExpr(aexpr, ok).add(10).mul(amult).log10();
                this.player.tickspeed = basetick.div(tsnum);
                this.multbyac = D(50).div(this.player.tickspeed);
                prevmu9 = basemu9.mul(tsnum);
                prevmu9mul = prevmu9.mul(prevmu9.max(1));
                curtick = ok;
            }
            if (update) {
                this.updateAccelerators(D(1), curtick, aexpr);
            } else {
                this.player.money = previnfo.money;
                this.player.generators = previnfo.generators;
                this.player.tickspeed = previnfo.tickspeed;
                this.multbyac = previnfo.multbyac;
            }
            const sec = curtick.mul(0.05);
            return { tick: curtick, sec: sec };
        } else {
            const tick = this.calcgoalticks(tmoney, update);
            const sec = this.tick2sec(tick, update);
            return { tick: tick, sec: sec };
        }
    };

    calcDarkGoalTick(tdmoney, mu = D(1)) {
        if (this.player.darkmoney.gte(tdmoney)) return D(0);
        if (this.player.darkgenerators.every(g => g.eq(0))) return D('Infinity');
        const dexpr = this.calcDarkGeneratorExpr(mu);
        let ok = D(2);
        let ng = D(0);
        while (Nig.calcAfterNtick(dexpr[0], ok).lt(tdmoney)) {
            ng = ok;
            ok = ok.mul(ok);
        }
        let cnt = 0;
        while (ng.add(1).lt(ok) && cnt < 60) {
            const m = ok.sub(ng).lt(4) ? ok.add(ng).div(2).floor() : ok.mul(ng).sqrt().floor();
            if (Nig.calcAfterNtick(dexpr[0], m).lt(tdmoney)) {
                ng = m;
            } else {
                ok = m;
            }
            cnt += 1;
        }
        return ok;
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
            const tickandsec = this.calcTickandSec(c, ty !== 0);
            const tick = tickandsec.tick;
            const sec = tickandsec.sec;
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
    };

    simulatechallenges(challengeid, rank, config) {
        let minres = {
            tickminimum: {
                tick: D('Infinity'),
                sec: D('Infinity'),
                challengebonuses: [],
                rankchallengebonuses: [],
                accelevelused: 0,
            },
            secminimum: {
                tick: D('Infinity'),
                sec: D('Infinity'),
                challengebonuses: [],
                rankchallengebonuses: [],
                accelevelused: 0,
            },
            config,
        };
        let accelevelcandidates = config.searchAccelLevel
            ? Array.from(new Array(this.player.accelevel + 1).keys())
            : [this.player.accelevelused];
        let challengebonusescandidates = config.searchChallengeBonuses
            ? mbcache.get(this.player.challengecleared.length, false, true)
            : [new Array(15).fill().map((_, i) => i).filter(i => this.player.challengebonuses[i])];
        let rankchallengebonusescandidates = config.searchRankChallengeBonuses
            ? mbcache.get(this.player.rankchallengecleared.length, true, true)
            : [new Array(15).fill().map((_, i) => i).filter(i => this.player.rankchallengebonuses[i])];
        accelevelcandidates.forEach(accelevel => {
            challengebonusescandidates.forEach(challengebonuses => {
                rankchallengebonusescandidates.forEach(rankchallengebonuses => {
                    if (this.player.onchallenge) this.exitChallenge();
                    for (let i = 0; i < 8; i++) if (this.player.challenges[i]) this.configChallenge(i);
                    for (let i = 0; i < 15; i++) if (this.player.challengebonuses[i]) this.toggleReward(i);
                    for (let i = 0; i < 15; i++) if (this.player.rankchallengebonuses[i]) this.toggleRankReward(i);
                    for (let i = 0; i < 8; i++) this.player.generatorsMode[i] = i;

                    for (let i = 0; i < 8; i++) if (challengeid & (1 << 7 - i)) this.configChallenge(i);
                    this.toggleReward(4);
                    if (config.toggleBonuses) {
                        this.toggleReward(1);
                        this.toggleReward(0);
                        this.toggleRankReward(1);
                        this.toggleRankReward(0);
                    }

                    this.startChallenge();
                    for (let i = 0; i < 2; i++) if (this.player.challengebonuses[i]) this.toggleReward(i);
                    for (let i = 0; i < 2; i++) if (this.player.rankchallengebonuses[i]) this.toggleRankReward(i);
                    if (!config.searchChallengeBonuses && this.player.challengebonuses[4]) this.toggleReward(4);

                    challengebonuses.forEach(c => this.toggleReward(c));
                    rankchallengebonuses.forEach(c => this.toggleRankReward(c));
                    this.player.accelevelused = accelevel;

                    let checkpoints = [rank ? this.resetRankborder() : D(this.isChallengeActive(0) ? '1e24' : '1e18')];
                    let res = this.simulate(checkpoints)[0];
                    if (res.tick.lt(minres.tickminimum.tick)) {
                        minres.tickminimum = {
                            tick: res.tick,
                            sec: res.sec,
                            challengebonuses: challengebonuses.slice(),
                            rankchallengebonuses: rankchallengebonuses.slice(),
                            accelevelused: this.player.accelevelused,
                        };
                    }
                    if (res.sec.lt(minres.secminimum.sec)) {
                        minres.secminimum = {
                            tick: res.tick,
                            sec: res.sec,
                            challengebonuses: challengebonuses.slice(),
                            rankchallengebonuses: rankchallengebonuses.slice(),
                            accelevelused: this.player.accelevelused,
                        };
                    }
                });
            })
        });
        return minres;
    };
};

const colors = ['#00ff00', '#11ff52', '#23ff9b', '#34ffda', '#46eeff', '#57c2ff', '#699fff', '#7a86ff', '#a18cff', '#ca9dff', '#e9afff', '#ffc0ff'];
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
            TROPHY_NUM: trophynum,
            SET_CHIP_KIND: setchipkind,
            SET_CHIP_NUM: setchipnum,
            nig: new Nig(),
            itemdata: itemdata,
            shinechallengelength: [64, 96, 128, 160, 192, 224],
            brightnessrankchallengelength: [32, 64, 128, 255],
            simulatedcheckpoints: Array.from(new Array(10), () => new Map()),
            challengesimulated: Array.from(new Array(10), () => new Array(256).fill(null)),
            rankchallengesimulated: Array.from(new Array(10), () => new Array(256).fill(null)),
            checkpoints: [D('1e18'), D('1e72')],
            cpsimulatedtime: Date.now(),
            sampletick: [1, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9],
            sampleticklabel: ['1', '1e1', '1e2', '1e3', '1e4', '1e5', '1e6', '1e7', '1e8', '1e9'],
            sampletime: [1, 60, 3600, 86400, 2592000, 31536000, 3153600000],
            sampletimelabel: ['s', 'm', 'h', 'D', 'M', 'Y', 'C'],
            hideclearedchallenge: false,
            hidechallengecolor: false,
            showtickminimum: false,
            challengeConfig: {
                searchChallengeBonuses: true,
                searchRankChallengeBonuses: true,
                searchAccelLevel: true,
                toggleBonuses: true,
            },
            autosimulatecheckpoints: false,
            checkpointtarget: 'point',
            checkpointvalue: '',
            procmspertick: 0,
            verbose: false,
            spoiler: false,
        }
    },
    computed: {
        startChallengeMessage() {
            let id = this.nig.calcChallengeId();
            let contents = '挑戦: ' + (this.nig.player.challengecleared.includes(id) ? '済' : '未');
            if (this.nig.player.rankchallengecleared.length > 0)
                contents += '  階位挑戦: ' + (this.nig.player.rankchallengecleared.includes(id) ? '済' : '未');
            return contents;
        },
        challengeid: function () {
            return function (i, j) {
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
            return function (i, j, rank = false) {
                const id = this.challengeid(i, j);
                const nowchallenging = this.nig.player.onchallenge && this.nig.calcChallengeId() == id;
                const clearedchallenge = rank ? this.nig.player.rankchallengecleared.includes(id) : this.nig.player.challengecleared.includes(id);
                return {
                    nowchallenging: nowchallenging,
                    clearedchallenge: clearedchallenge,
                    unchallengeable: i == 0 && j == 0,
                };
            };
        },
        challengescolor: function () {
            return function (i, j, rank = false) {
                const id = this.challengeid(i, j);
                let color = 'transparent';
                const res = rank ? this.rankchallengesimulated[this.nig.world][id] : this.challengesimulated[this.nig.world][id];
                if (res !== null) {
                    if (this.showtickminimum) {
                        const tick = res.tickminimum.tick;
                        if (tick.eq(D('Infinity'))) {
                            color = 'rgb(255, 255, 255)';
                        } else {
                            const f = tick.max(1).log10() / Math.log10(1e10);
                            color = colorbarpower(f);
                        }
                    } else {
                        const sec = res.secminimum.sec.add(res.secminimum.tick.mul(this.procmspertick * 0.001));
                        if (sec.eq(D('Infinity'))) {
                            color = 'rgb(255, 255, 255)';
                        } else {
                            const f = sec.max(1).log10() / Math.log10(3153600000);
                            color = colorbarpower(f);
                        }
                    }
                }
                return { 'background-color': color };
            };
        },
        challengemessage: function () {
            return function (i, j, rank = false) {
                const id = this.challengeid(i, j);
                const res = rank ? this.rankchallengesimulated[this.nig.world][id] : this.challengesimulated[this.nig.world][id];
                let message = 'Uncalculated';
                if (res !== null) {
                    let mres = this.showtickminimum ? res.tickminimum : res.secminimum;
                    const sec = mres.sec.add(mres.tick.mul(this.procmspertick * 0.001));
                    message = mres.tick.toExponential(3) + ' ticks';
                    message += '<br/>(' + sec.toExponential(3) + ' sec)';
                    if ((this.verbose || this.challengeConfig.searchChallengeBonuses) && mres.challengebonuses.length > 0) message += '<br/>効力' + mres.challengebonuses.map(x => x + 1);
                    if ((this.verbose || this.challengeConfig.searchRankChallengeBonuses) && mres.rankchallengebonuses.length > 0) message += '<br/>上位効力' + mres.rankchallengebonuses.map(x => x + 1);
                    if ((this.verbose || this.challengeConfig.searchAccelLevel) && this.nig.player.accelevel > 0) message += '<br/>起動時間回帰力' + mres.accelevelused;
                    // message += '<br/>id: ' + id;
                }
                return message;
            };
        },
        checkpointmessage: function () {
            return function (checkpoint) {
                const res = this.simulatedcheckpoints[this.nig.world].get(checkpoint);
                if (res === undefined) return checkpoint.toExponential(3) + ' ポイントまで ???';
                const sec = res.sec.add(res.tick.mul(this.procmspertick * 0.001));
                let content = checkpoint.toExponential(3) + ' ポイントまで ' + res.tick.toExponential(3) + ' ticks';
                content += ' (' + sec.toExponential(3) + ' sec)';
                content += ' ' + (new Date(this.cpsimulatedtime + Number(sec.mul(1000).toExponential(20)))).toLocaleString() + ' に達成';
                return content;
            };
        },
        tmoneys() {
            let [start, stop, opstep] = this.checkpointvalue.split(':', 3);
            let [op, step] = opstep === undefined ? (this.checkpointtarget === 'point' ? ['*', '10'] : ['+', '1']) : opstep.startsWith('*') ? [opstep[0], opstep.slice(1)] : ['+', opstep];
            try {
                if (start !== undefined) start = D(start.trim());
                if (stop !== undefined) stop = D(stop.trim());
                if (step !== undefined) step = D(step.trim());
            } catch (error) {
                return [];
            };
            let arr = [];
            if (stop !== undefined) {
                while (arr.length < 100 && start.lte(stop)) {
                    let t = this.nig.targetmoney(this.checkpointtarget, start);
                    if (t.gt(0)) arr.push(t);
                    start = op === '*' ? start.mul(step) : start.add(step);
                }
            } else {
                let t = this.nig.targetmoney(this.checkpointtarget, start);
                if (t.gt(0)) arr.push(t);
            }
            return arr;
        },
        tmoneysDesc() {
            if (this.tmoneys.length === 0) {
                return 'Invalid';
            } else if (this.tmoneys.length === 1) {
                return this.tmoneys[0].toExponential(1) + ' ポイント';
            } else {
                return this.tmoneys[0].toExponential(1) + '～' + this.tmoneys[this.tmoneys.length - 1].toExponential(1) + ' ポイント(' + this.tmoneys.length + ')';
            }
        },
        gexpr() {
            return this.nig.calcGeneratorExpr();
        },
        aexpr() {
            return this.nig.calcAcceleratorExpr();
        },
        expression: function () {
            return function (i, ty) {
                const e = ty == 0 ? this.gexpr[i] : this.aexpr[i];
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
        isLightBought() {
            if (this.nig.player.money.gte('1e200') && this.nig.player.crownresettime.gt(0)) return true;
            if (this.nig.player.lightmoney.gt(0)) return true;
            return this.nig.player.lightgenerators.some(d => d.gt(0));
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
        spendShine(num) {
            this.nig.spendShine(num);
            this.clearCheckpointsCache();
        },
        spendBrightness(num) {
            this.nig.spendBrightness(num);
            this.clearAllCache();
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
            this.clearAllCache();
        },
        buyLightGenerator(i) {
            this.nig.buyLightGenerator(i);
            this.clearAllCache();
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
        buildStatue(i) {
            this.nig.buildStatue(i);
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
        toggleChip(i) {
            this.nig.toggleChip(i);
            this.clearAllCache();
        },
        configChip(i, j) {
            this.nig.configChip(i, j);
            this.clearAllCache();
        },
        workTime(i) {
            this.nig.workTime(i);
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
            this.tmoneys.forEach(tmoney => this.checkpoints.push(tmoney));
        },
        removecheckpoint(i) {
            this.checkpoints.splice(i, 1);
        },
        simulatecheckpoints() {
            setTimeout(() => {
                if (this.checkpoints.length == 0) return;
                const res = this.nig.clone().simulate(this.checkpoints);
                this.cpsimulatedtime = Date.now();
                res.forEach((r, i) => this.simulatedcheckpoints[this.nig.world].set(this.checkpoints[i], r));
            }, 0);
        },
        simulatechallenges(challengeid, rank, rec) {
            setTimeout(() => {
                if (challengeid <= 0 || 256 <= challengeid) return;
                let sim = rank ? this.rankchallengesimulated : this.challengesimulated;
                let update = sim[this.nig.world][challengeid] === null;
                if (!update) update |= sim[this.nig.world][challengeid].config !== this.challengeConfig;
                if (!update) update |= !this.challengeConfig.searchChallengeBonuses && sim[this.nig.world][challengeid].secminimum.challengebonuses !== new Array(15).fill().map((_, i) => i).filter(i => this.nig.player.challengebonuses[i]);
                if (!update) update |= !this.challengeConfig.searchRankChallengeBonuses && sim[this.nig.world][challengeid].secminimum.rankchallengebonuses !== new Array(15).fill().map((_, i) => i).filter(i => this.nig.player.rankchallengebonuses[i]);
                if (!update) update |= !this.challengeConfig.searchAccelLevel && sim[this.nig.world][challengeid].secminimum.accelevelused !== this.nig.player.accelevelused;

                if (update) sim[this.nig.world][challengeid] = this.nig.clone().simulatechallenges(challengeid, rank, JSON.parse(JSON.stringify(this.challengeConfig)));
                if (rec) this.simulatechallenges(challengeid + 1, rank, rec);
            }, 0);
        },
        simulatechallengeone(i, j, rank) {
            this.simulatechallenges(this.challengeid(i, j), rank, false);
        },
        simulatechallengesall(rank) {
            this.simulatechallenges(1, rank, true);
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
        chipcoloredbuttoncls(j) {
            if (j === 0) {
                return {};
            } else {
                let color = ['#cd7f32', 'silver', 'gold', '#E5E4E2'][j - 1];
                return {
                    'background-color': color,
                };
            }
        },
    },
    mounted() {
        setTimeout(() => renderMathInElement(document.getElementById('gaexpression'), { delimiters: [{ left: '\\(', right: '\\)', display: false }] }), 0);
    },
    updated() {
        setTimeout(() => renderMathInElement(document.getElementById('gaexpression'), { delimiters: [{ left: '\\(', right: '\\)', display: false }] }), 0);
    },
});
app.config.isCustomElement = tag => {
    const custom = ['mi', 'mrow', 'annotation', 'semantics', 'math'];
    return custom.includes(tag);
};
app.mount('#app');
