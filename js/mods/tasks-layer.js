Vue.component("tasks-layer", {
    data: function() {
        return {
            functions: game.tasksLayer
        }
    },
    computed: {
        canProduceFunctions: function()
        {
            return this.tasks.getFunctionsBoostFromLayer().gt(0);
        },
        isSoftCapped: function()
        {
            return this.tasks.TasksPoints.gte("1.8e308");
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
        highestLayer: () => functions.maxLayerUnlocked()
    },
    template: `<div class="tasks-layer">
    <div class="resource">
    <p>You have {{formatNumber(Tasks.TasksPoints, 2, 2, 1e9)}} <span class="aleph">task points</span></p>
    <p>You are gaining {{formatNumber(Tasks.getTasksGain(), 2, 2, 1e9)}} <span class="aleph">functions points</span> every second</p>
    </div>
    <div class="boosts">
    <p>Your <span class="aleph">tasks points</span> raise all resource multipliers upgrades to the {{formatNumber(functions.getTasksEff(), 2, 2, 1e9)}}</p>
    </div>
    <div class="boosts">
    <div v-if="canProduceTasks">
        <p>Your layer boosts the gain of functions points, translated to a x{{formatNumber(Tasks.getTasksBoostFromLayer(), 2, 2)}} Boost on <span class="aleph">Tasks</span> gain</p>
    </div>
    <div v-else>
        <p>You need to get <span>Ʊ</span> at least once to get <span class="aleph">tasks</span></p>
    </div>
    <div class="tabs">
    <button @click="tasks.maxAll()">Max All (M)</button>
    </div>
    <div class="upgrades">
    <tasks-upgrade :upgrade="tasks.upgrades.functionsGain"></tasks-upgrade>
    <tasks-upgrade :upgrade="tasks.upgrades.functionsBonus"></tasks-upgrade>
    </div>
    <h3>Variables</h3>
    <p>T(<b>x</b>)=<b>γx</b><sup>2.5</sup>+<b>βx</b><sup>2</sup>+<b>αx</b><sup>1.5</sup>+<b>x</b> = {{formatNumber(functions.getTasksValue(), 2, 2, 1e9)}}</p>
    <p>T(<b>x</b>) also multiplies tasks points gain</p>
    <div class="upgrades">
    <tasks-upgrade :upgrade="tasks.upgrades.Variable_X"></tasks-upgrade>
    <tasks-upgrade :upgrade="tasks.upgrades.Variable_alpha"></tasks-upgrade>
    <tasks-upgrade :upgrade="tasks.upgrades.Variable_beta"></tasks-upgrade>
    <tasks-upgrade :upgrade="tasks.upgrades.Variable_gamma"></tasks-upgrade>
    </div>
    </div>
    <h3>Functions</h3>
    <div class="upgrades">
    <tasks-upgrade :upgrade="tasks.upgrades.ResourceMultipliersBasedOnLayers"></functions-upgrade>
    <tasks-upgrade :upgrade="tasks.upgrades.SelfFunctions"></tasks-upgrade>
    <tasks-upgrade :upgrade="tasks.upgrades.MoreLayerCoins"></tasks-upgrade>
    <tasks-upgrade :upgrade="tasks.upgrades.CostDivider"></tasks-upgrade>
    </div>
</div>
</div>`
});
