Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v1.0.2</template>
    <template v-slot:text>wow this 2 new layers and 1 nnew achievement!
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.0.1</template>
    <template v-slot:text>ever more restacks for mods!
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.0.0 preview</template>
    <template v-slot:text>how how?
    </template>
    </guide-item>
</div>`
})
