var go = "",
  got;

$(".custom-file-input").on("change", (e) => {
  console.log(e);
  console.log(e.currentTarget.files.length);
  got = e;
  go = e.currentTarget.parentElement.id.split("--")[1];
  // $("#q-" + e.currentTarget.parentElement.id.split("--")[1]).val("1111");
  // ========== Upload ===============

  if (e.currentTarget.files[0].size <= 50240000) {
    console.log("I entered");
    $("#progressBar" + go).show();
    var file_data = $("#" + e.currentTarget.id).prop("files")[0];
    var form_data = new FormData();
    form_data.append("file", file_data);
    $.ajax({
      url: "/api/uploadapi", // point to server-side PHP script
      dataType: "text", // what to expect back from the PHP script, if anything
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: "post",
      success: function (res) {
        $("#q-" + go).val(res);
        $("#progressBar" + go).hide();
        imageName = $("#" + got.currentTarget.id).prop("files")[0].name;
        $("#label-" + go).html(imageName);
      },
      progress: function (progress) {
        console.log(progress);
      },
    });
  } else {
    alert("File Size is big, Please upload less than 5 Mb");
  }
});

function wantToCreateTeam() {
  if ($("#createTeamCheck:checkbox:checked").length > 0) {
    $("#createTeam").show();
    if ($("#team-change").hasClass("show")) {
      $("#team-change").toggle("collapse");
    }
    $("#joinMyTeam").show();

    // $('#team-change').show();
  } else {
    $("#createTeam").hide();
    if ($("#team-change").hasClass("show")) {
      $("#team-change").toggle("collapse");
    }
    $("#joinMyTeam").hide();
  }
}

function addProblemStatement() {
  var idea = {
    teamName: $("#uniTeamName").val(),
    problemStatement: $('input[name="c11"]:checked').val(),
  };

  console.log(idea);

  $.post("updateProblem", idea).then((d) => {
    location.reload();
  });
}

// function editMyIdea() {
//     // alert("HELLO");
//     $('#idea_content').show();
//     $('#idea_done').hide();
//     // After Submitting
//     $('#doneIdea').hide();
//     $('#editIdea').hide();
//     // Before Submitting
//     $('#submitBtn').show();
//     $('#cancelIdea').show();
// }
// $(document).ready(function () {
//     if ($('#ps').val() != "") {
//         $('#idea_content').hide();
//         $('#idea_done').show();
//         // After Submitting
//         $('#doneIdea').show();
//         $('#editIdea').show();
//         // Before Submitting
//         $('#submitBtn').hide();
//         $('#cancelIdea').hide();
//     }
// });

function removeMeFromTeam(memName) {
  var rem = {
    memName: $("#memNameToRemove").html(),
    teamName: $("#uniTeamName01").html(),
  };
  $.post("removeMember", rem).then((d) => {
    if (d == "done") {
      location.reload();
      alert("Removed Successfully");
    } else {
      alert("Some Error Occurred");
      location.reload();
    }
  });
}

// Delete team

function deleteTeam(teamName) {
  $.post("deleteTeam", {
    teamName: teamName,
  }).then((d) => {
    if (d == "done") {
      location.reload();
      alert("Team Deleted!");
    } else {
      alert("Some Error Occurred");
      location.reload();
    }
  });
}

function updateMem(memName) {
  $("#memNameToRemove").html(memName);
}

function addToTeam(teamName, email) {
  // alert(teamName + "   " + email);

  $.post("confirmjointeam", {
    teamName: teamName,
    email: email,
  }).then((d) => {
    if (d == "done") {
      location.reload();
      alert("Added " + email + " Successfully");
    } else {
      alert("Some Error Occurred");
      location.reload();
    }
  });
}

function addToTeamInvite(teamName, email) {
  $.post("confirmjointeaminvite", {
    teamName: teamName,
    email: email,
  }).then((d) => {
    if (d == "done") {
      location.reload();
    } else {
      alert("Some Error Occurred");
      location.reload();
    }
  });
}

function declineFromTeam(teamName, email) {
  // alert(teamName + "   " + email);

  $.post("declinejointeam", {
    teamName: teamName,
    email: email,
  }).then((d) => {
    if (d == "done") {
      location.reload();
      alert("Declined " + email);
    } else {
      alert("Some Error Occurred");
      location.reload();
    }
  });
}

function declineFromTeamInvite(teamName, email) {
  // alert(teamName + "   " + email);

  $.post("declinejointeaminvite", {
    teamName: teamName,
    email: email,
  }).then((d) => {
    if (d == "done") {
      location.reload();
    } else {
      alert("Some Error Occurred");
      location.reload();
    }
  });
}

function LeaveTeam(memName, teamName) {
  $.post("leaveteam", {
    teamName: teamName,
    userEmail: memName,
  }).then(() => {
    location.reload();
  });
}

function JoinTeamHashed(userEmail) {
  console.log("JOIN by, ", userEmail);
  var teamNameIs = getUrlVars().teamName.split("%20").join(" ");
  $.post("jointeamdirect", {
    changeTeamName: teamNameIs,
    userEmail: userEmail,
  }).then((d) => {
    if (d == "limit") {
      alert(
        "Team Member limit exceed for this team; Instead create your own team"
      );
      window.location.href = window.location.href.split("?")[0];
    } else if (d == "noteam") {
      alert(
        "Team Name not exists; Team is been deleted or has changed their name"
      );
      window.location.href = window.location.href.split("?")[0];
    } else {
      window.location.href = window.location.href.split("?")[0];
    }
  });
}

function myFunction(teamName) {
  teamName = teamName.split(" ").join("%20");
  link =
    "Hey, I am Inviting you to join my team in the world best Hackathon ONE-HACK! Click on the below link to join my team directly ";
  link += window.location.href.split("#")[0] + "#" + teamName;
  navigator.clipboard.writeText(link).then(
    function () {
      alert("Shareable link Copied to clip board");
    },
    function (err) {
      alert("Err Coping to clip board");
    }
  );
}

function shareOnWhatsApp(teamName, hackCountry) {
  teamName = teamName.split(" ").join("%20");
  link =
    "Hey buddy,%0aI am inviting you to join my team for the world's biggest Hackathon ONE-HACK! Click on the below link to join my team directly %0a%0a" +
    encodeURIComponent(
      "https://hack2skill.com/hack/onehack/" + hackCountry + "#" + teamName
    );
  window.location = "https://api.whatsapp.com/send?text=" + link;
  // console.log(link);
}

// AUTOMATED HACKATHON

function myFunction1(teamName, hackName) {
  teamName = teamName.split(" ").join("%20");
  link = `Hey, I am Inviting you to join my team in Hackathon ${hackName} Click on the below link to join my team directly `;
  link +=
    "https://hack2skill.com/hack/" +
    hackName +
    "/signup" +
    "?teamName=" +
    teamName;
  navigator.clipboard.writeText(link).then(
    function () {
      alert("Shareable link Copied to clip board");
    },
    function (err) {
      alert("Err Coping to clip board");
    }
  );
}

function shareOnWhatsApp1(teamName, hackName) {
  teamName = teamName.split(" ").join("%20");
  link =
    `Hey,%0aI am inviting you to join my team in Hackathon ${hackName} ! Click on the below link to join my team directly %0a%0a` +
    encodeURIComponent(
      "https://hack2skill.com/hack/" +
        hackName +
        "/signup" +
        "?teamName=" +
        teamName
    );
  window.location = "https://api.whatsapp.com/send?text=" + link;
  // console.log(link);
}

function shareOnTwitter(teamName, hackCountry) {
  teamName = teamName.replace(" ", "%20");
  link =
    "Dear Fellow Developers,%0a%0aI am Looking for teammates who can join my team for IncubateIND upcoming world's biggest Hackathon ONE-HACK! Click on the below link to join my team directly %0a%0a" +
    encodeURIComponent(
      "https://hack2skill.com/hack/onehack/" + hackCountry + "#" + teamName
    ) +
    "%0a%0a @hack2skill #hack2skill #hackathons #hack";
  window.location = "https://twitter.com/intent/tweet?text=" + link;
}
