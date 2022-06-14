window.addEventListener("load", async () => {
  const $ = (str, doc=document) => [...doc.querySelectorAll(str)];
  // const enc = str => [...str].map(s => String.fromCharCode(s.charCodeAt() + 1)).join("");
  const dec = str => [...str].map(s => String.fromCharCode(s.charCodeAt() - 1)).join("");
  console.log("Working");

  const vids = Array.from({length: 2}, (e, i) => $(".vid"+ (i+1))[0]);
  const [vid1, vid2] = vids;
  vids.forEach(vid => vid.addEventListener("contextmenu", e => e.preventDefault()));

  const getVid = n => `./vids/nail (${n}).mp4`;
  const vidLimit = 10;
  let currentContainer = vid1;
  let offContainer = vid2;
  let currentVid = 0;
  function vidCanPlay() {
    offContainer.classList.remove("layer2");
    offContainer.classList.add("layer1");
    currentContainer.classList.remove("layer1");
    currentContainer.classList.add("layer2");
    this.play();
    currentContainer.removeEventListener("loadedmetadata", vidCanPlay);
  }

  vids.forEach(vid => {
    vid.addEventListener("ended", function () {
      offContainer = currentContainer;
      currentContainer = currentContainer == vid1 ? vid2 : vid1;
      currentVid = (currentVid + 1) % vidLimit;
      currentContainer.addEventListener("loadedmetadata", vidCanPlay)
      currentContainer.src = getVid(currentVid + 1);
    });
  });
  vid1.play();

  let phoneHref;
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const smsBody = "Are you avaliable for an appointment on";
  const phoneNum = dec("8713275199");
  if (/android/i.test(userAgent)) phoneHref = `sms:${phoneNum}?body=${smsBody}`;
  else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) phoneHref = `sms:${phoneNum}&body=${smsBody}`;
  else phoneHref = `tel:${phoneNum}`;

  const showPhoneInfoBtn = $(".phone-btn")[0];
  const phoneInfo = $(".phone-info")[0];
  showPhoneInfoBtn.addEventListener("click", e => {
    [showPhoneInfoBtn, phoneInfo]
      .forEach(el => el.classList.toggle("hidden"));
    const numberDisplay = $(".number-display")[0];
    numberDisplay.innerText = dec(")871*327.5199");
    numberDisplay.href = phoneHref;
  });
});
