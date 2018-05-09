var steroidTableFieldtype = Vue.component('table-fieldtype');

Vue.component('table_on_steroids-fieldtype', {

    mixins: [Fieldtype],

    extends: steroidTableFieldtype,

    methods: {
        csvToJavascript() {

            var temp = this.csv.replace(/\"(.*?)(?=\n)(\n[\s]+)(.*?)\"/gm, "$1<br/>$3")
            var lines = temp.split("\n");

            var result = [];

            for(var i = 0; i < lines.length; i++) {
                var line = {
                    cells: []
                };

                var entries = lines[i].split(',');

                for(var j = 0; j < entries.length; j++) {
                    line.cells.push(entries[j]);
                }

                result.push(line);
            }

            this.data = result;
        },
        getAdditionalTemplate() {
            return '' +
                    '<div>' +
                        '<label>CSV data for table</label>' +
                        '<textarea v-model="csv" rows="4" style="width:100%; margin-bottom: 10px;"></textarea>' +
                        '<a class="btn btn-default" style="margin-bottom: 20px;" @click="csvToJavascript">Parse CSV</a>' +
                    '</div>'
        }
    },

    beforeCompile: function () {
        $(this.$el).prepend(this.getAdditionalTemplate());
    },

});
