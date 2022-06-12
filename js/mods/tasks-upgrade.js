Vue.component("tasks-upgrade", {
    props: ["upgrade"],
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="'<span class=` + 'aleph' + `>TP</span>'"></resource-upgrade>`
});
