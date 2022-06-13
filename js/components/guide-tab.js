Vue.component("guide-tab", {
    computed: {
        betaUnlocked: () => game.layers.length >= 2 || game.metaLayer.active,
        gammaUnlocked: () => game.layers.length >= 3 || game.metaLayer.active,
        epsilonUnlocked: () => game.layers.length >= 5 || game.metaLayer.active,
        alephUnlocked: () => game.alephLayer.isUnlocked() || game.metaLayer.active,
        restackUnlocked: () => game.restackLayer.isUnlocked() || game.metaLayer.active,
        metaUnlocked: () => game.metaLayer.active,
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim)
    },
    template: `<div class="guide-tab">
    <guide-item>
        <template v-slot:title>big task</template>
        <template v-slot:text>what
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>Omega Squared</template>
        <template v-slot:text>ω<sup>2</sup>
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>Omega Cubed</template>
        <template v-slot:text>ω<sup>3</sup>
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>Omega Hyperdimenosial</template>
        <template v-slot:text>ω<sup>ω</sup>
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>Restack</template>
        <template v-slot:text>i mind restack coin?
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>Task</template>
        <template v-slot:text>task no go this game?
        </template>
    </guide-item>
</div>`
})
