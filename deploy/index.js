document.addEventListener("DOMContentLoaded", () => {
  const downloadButton = document.getElementById("download-button");

  // 유저스크립트 다운로드 URL
  downloadButton.addEventListener("click", () => {
    const downloadUrl = "https://oein.github.io/VTuberBlocker/dist.user.js";
    window.open(downloadUrl, "_blank");
  });
});
