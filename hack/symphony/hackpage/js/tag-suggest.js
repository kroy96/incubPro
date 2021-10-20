// var data =
//   '[{ "value": 1, "text": "A.NET", "continent": "A.NET" }, { "value": 2, "text": "Task 2", "continent": "Task" }, { "value": 3, "text": "Task 3", "continent": "Task" }, { "value": 4, "text": "Task 4", "continent": "Task" }, { "value": 5, "text": "Task 5", "continent": "Task" }, { "value": 6, "text": "Task 6", "continent": "Task" } ]';

// var task = new Bloodhound({
//   datumTokenizer: Bloodhound.tokenizers.obj.whitespace("text"),
//   queryTokenizer: Bloodhound.tokenizers.whitespace,
//   local: jQuery.parseJSON(data),
// });

// task.initialize();

// var elt = $("#interest");
// elt.tagsinput({
//   itemValue: "value",
//   itemText: "text",
//   typeaheadjs: {
//     name: "task",
//     displayKey: "text",
//     source: task.ttAdapter(),
//   },
// });

// elt.tagsinput("add", {
//   value: 1,
//   text: "task 1",
//   continent: "task",
// });

// TEST

var interest = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: {
    url: "https://localhost:3000/hackpage/dist/data/data.json",
    filter: function (list) {
      return $.map(list, function (interests) {
        return { name: interests };
      });
    },
  },
});
interest.initialize();

$("#interest").tagsinput({
  typeaheadjs: {
    name: "interest",
    displayKey: "name",
    valueKey: "name",
    source: interest.ttAdapter(),
  },
});
