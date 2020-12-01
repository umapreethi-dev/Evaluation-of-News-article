function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formURL = document.getElementById("url").value;

  if (!Client.checkForURL(formURL)) {
    console.log("Enter a valid url");
    document.getElementById("error").innerHTML = "Enter a valid URL";
  } else {
    console.log("::: Form Submitted :::");
  }
  fetch(`http://localhost:8081/article?txt=${formURL}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);

      document.getElementById(
        "confidence"
      ).innerHTML = `Confidence:  ${data.confidence}`;
      document.getElementById("irony").innerHTML = `Irony: ${data.irony}`;
      document.getElementById(
        "score_tag"
      ).innerHTML = `Score_tag: ${data.score_tag}`;
      document.getElementById(
        "subjectivity"
      ).innerHTML = `Subjectivity: ${data.subjectivity}`;
    });
}

export { handleSubmit };
