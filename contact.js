const appLabels = {
  general: "Portfolio / demande générale",
  "running-speed-calculator": "Running Speed Calculator",
  remplapp: "RemplApp",
};

const form = document.getElementById("contact-form");

if (form) {
  const params = new URLSearchParams(window.location.search);
  const appField = document.getElementById("app");
  const subjectField = document.getElementById("subject");

  const requestedApp = params.get("app");
  const requestedSubject = params.get("subject");

  if (requestedApp && appLabels[requestedApp]) {
    appField.value = requestedApp;
  }

  if (requestedSubject) {
    subjectField.value = requestedSubject;
  } else if (requestedApp && appLabels[requestedApp]) {
    subjectField.value = `Question concernant ${appLabels[requestedApp]}`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const app = data.get("app");
    const name = data.get("name");
    const email = data.get("email");
    const subject = data.get("subject");
    const message = data.get("message");

    const lines = [
      `Application : ${appLabels[app] || app}`,
      `Nom : ${name}`,
      `Email : ${email}`,
      "",
      "Message :",
      String(message || "").trim(),
    ];

    const mailto = `mailto:support.benjaminwolff@pm.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\r\n"))}`;
    window.location.href = mailto;
  });
}
