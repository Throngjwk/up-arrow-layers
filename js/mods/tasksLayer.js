class TasksLayer
{
    constructor()
    {
        this.tasksPoints = new Decimal(0);
        this.upgrades = {
            functionsGain: new TasksUpgrade("Increase your Funcitons points gain",
            level => Decimal.pow(1.225, level).mul(200),
            level => Decimal.pow(1.2, level),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            functionsBonus: new TasksUpgrade("Gain a bonus to Functions points gain",
            level => Decimal.pow(1e3, level).mul(1000),
            level => new Decimal (1).add(level.div(10).mul(Decimal.pow(1.05, Decimal.max(level.sub(10), 0)))),
            {getEffectDisplay: effectDisplayTemplates.percentStandard(3, "", " %", 0)}
            ),
            Variable_X: new TasksUpgrade("Increase the value of <b>ω</b>",
            level => Decimal.pow(1e3, level.add(1)),
            level => new Decimal (1).add(level),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "",)}
            ),
            Variable_alpha: new TasksUpgrade("Increase the value of <b>ω2</b>",
            level => Decimal.pow(1e9, level.add(1)),
            level => level,
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "",)}
            ),
            Variable_beta: new TasksUpgrade("Increase the value of <b>ω^2</b>",
            level => Decimal.pow(1e18, level.add(1)).mul(1e32),
            level => level,
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "",)}
            ),
            Variable_gamma: new TasksUpgrade("Increase the value of <b>ω^ω</b>",
            level => Decimal.pow(1e30, level.add(1)).mul(1e50),
            level => level,
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "",)}
            ),
            ResourceMultipliersBasedOnLayers: new TasksUpgrade("All Resource Multipliers are stronger based on Layer you currently on",
            level => Decimal.pow(1e5, level.pow(1.25)).mul(1000),
            level => new Decimal (1).add(game.metaLayer.layer.mul(level).pow(level.div(10)).add(1).log(10).pow(0.8).div(10)),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),
            SelfFunctions: new TasksUpgrade("Gain more Tasks Points based on log(T)",
            level => new Decimal (1e6).pow(Decimal.pow(1.2, level)),
            level => new Decimal(1).add(Decimal.max(0, game.functionsLayer.functionsPoints).add(1).log10().mul(level.add(1)).mul(0.05)).pow(2.5),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            MoreLayerCoins: new TasksUpgrade("Gain more Layer Coins on restack",
            level => new Decimal (1e10).pow(Decimal.pow(1.6, level)),
            level => Decimal.add(1, level).pow(level.add(1).log(10).add(1)).pow(8),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),
            CostDivider: new TasksUpgrade("Divide the cost of all resource multipliers and powerers",
            level => new Decimal (1e30).pow(Decimal.pow(1.25, level.pow(1.2))),
            level => new Decimal (8).pow(level.pow(0.8)).mul(100).floor().div(100),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "÷")}
            ),
        }
    }

    getTasksEff()
    {
        let base = game.functionsLayer.functionsPoints.add(1)
        let expo = new Decimal(0.5)
        let eff = base.pow(expo)
        return eff
    }

    getFunctionsGain()
    {
        return new Decimal (1)
        .mul(this.getFunctionsBoostFromLayer())
        .mul(this.getFunctionsValue())
        .mul(this.upgrades.TasksGain.apply())
        .mul(this.upgrades.tasksBonus.apply())
        .mul(this.upgrades.SelfTasks.apply());
    }

    getTasksValue()
    {
        return new Decimal (this.upgrades.Variable_X.apply())
        .add(this.upgrades.Variable_alpha.apply().mul(this.upgrades.Variable_X.apply().pow(1.5)))
        .add(this.upgrades.Variable_beta.apply().mul(this.upgrades.Variable_X.apply().pow(2)))
        .add(this.upgrades.Variable_gamma.apply().mul(this.upgrades.Variable_X.apply().pow(2.5)))
    }

    isUnlocked()
    {
        return game.highestUpdatedLayer.gte("1.8e308");
    }

    getTasksBoostFromLayer()
    {
        if(game.metaLayer.layer.lte(new Decimal("1.8e308"))) return new Decimal(0);
        return Decimal.log2(game.metaLayer.layer).sub("1024")
    }

    maxAll()
    {
        for(const k of Object.keys(this.upgrades))
        {
            this.upgrades[k].buyMax();
        }
    }

    tick(dt)
    {
        if(this.isUnlocked())
        {
            this.functionsPoints = this.functionsPoints.add(this.getFunctionsGain().mul(dt));
        }
    }

    loadFromSave(obj)
    {
        this.functionsPoints = obj.functionsPoints;
        for(const k of Object.getOwnPropertyNames(obj.upgrades))
        {
            if(this.upgrades[k])
            {
                this.upgrades[k].level = obj.upgrades[k].level;
            }
        }
    }
}
