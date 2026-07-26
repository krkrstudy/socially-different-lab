const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = [...document.querySelectorAll("main section[id]")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const profileDialog = document.getElementById("profile-dialog");
const profileCloseButton = profileDialog.querySelector(".profile-close");
const profileImage = document.getElementById("profile-image");
const profileName = document.getElementById("profile-name");
const profileRole = document.getElementById("profile-role");
let activeProfileTrigger = null;

const memberProfiles = {
  "mei-yang": {
    name: "Mei Yang",
    role: "Master's student · 2024 cohort",
    image: "assets/team/mei-yang.jpg",
    position: "center 40%",
    research: "Mental health in children and adolescents; attachment and family therapy; anxiety and depression in adults.",
    hobbies: "Reading and working."
  },
  "haichen-zhang": {
    name: "Haichen Zhang",
    role: "Undergraduate student · 2024 cohort",
    image: "assets/team/haichen-zhang.jpg",
    position: "center 34%",
    research: "Social anxiety and related social difficulties and disorders.",
    hobbies: "Reading novels, listening to music, and playing murder-mystery role-playing games."
  },
  "kairan-wang": {
    name: "Kairan Wang",
    role: "Undergraduate student · 2023 cohort · Research assistant",
    image: "assets/team/kairan-wang.jpg",
    position: "center 30%",
    quote: "Strive ceaselessly for self-improvement; carry the world with profound virtue."
  },
  "xinyi-bao": {
    name: "Xinyi Bao",
    role: "Undergraduate student · 2025 cohort",
    image: "assets/team/xinyi-bao.jpg",
    position: "center 36%",
    about: "One of my favorite books is All the Bright Places, a story that speaks to adolescent mental health. I look forward to learning from our professor and senior lab members.",
    hobbies: "Drawing, music, and good food."
  },
  "anting-xie": {
    name: "Anting Xie",
    role: "Undergraduate student · 2022 cohort",
    image: "assets/team/anting-xie.jpg",
    position: "center 31%",
    about: "A psychology + AI researcher who likes to explore a little bit of everything.",
    hobbies: "Singing."
  },
  "chuangyi-du": {
    name: "Chuangyi Du",
    role: "Doctoral student · 2026 cohort",
    image: "assets/team/chuangyi-du.jpg",
    position: "center 44%",
    quote: "In a scholar's robe, with paper and pen, one may bring order to the world—who says a person of deep feeling is any less courageous?"
  },
  "siyu-ma": {
    name: "Siyu Ma",
    role: "Undergraduate student · 2022 cohort",
    image: "assets/team/siyu-ma.jpg",
    position: "center 30%",
    research: "Autism, social difficulties, and patterns of communication.",
    hobbies: "Skiing, photography, and good food."
  },
  "zhezhen-song": {
    name: "Zhezhen Song",
    role: "Master's student · 2025 cohort",
    image: "assets/team/zhezhen-song.jpg",
    position: "center 32%",
    about: "Chinese–Chinese mixed heritage · Chinese by nationality and heritage · seasoned Taobao buyer · e-commerce VIP · milk-tea connoisseur · nationally certified ID-card holder · licensed C1D driver · aspiring Nobel Prize contender · internet-surfing enthusiast."
  },
  "xiaoya-wen": {
    name: "Xiaoya Wen",
    role: "Undergraduate student · 2024 cohort",
    image: "assets/team/xiaoya-wen.jpg",
    position: "center 32%",
    about: "I am both introverted and outgoing, a little quirky, and always trying to live my adorably earnest life. I hope that understanding others will also help me understand myself.",
    research: "Social difficulties, emotion, and self-perception.",
    hobbies: "Ball games, long-distance running, drawing tiny cute characters, fluffy animals, and making handmade gifts for friends.",
    quote: "Let’s keep working hard together!"
  },
  "jiawen-li": {
    name: "Jiawen Li",
    role: "Master's student · 2025 cohort",
    image: "assets/team/jiawen-li.jpg",
    position: "center 32%",
    quote: "Forward! Forward!"
  },
  "xintong-wu": {
    name: "Xintong Wu",
    role: "Undergraduate student · 2022 cohort",
    image: "assets/team/xintong-wu.jpg",
    position: "center 30%",
    quote: "Keep going!"
  }
};

function setProfileField(field, value) {
  const section = profileDialog.querySelector(`[data-profile-field="${field}"]`);
  const content = document.getElementById(`profile-${field}`);
  section.hidden = !value;
  content.textContent = value || "";
}

function openProfile(trigger) {
  const profile = memberProfiles[trigger.dataset.profile];
  if (!profile) return;

  activeProfileTrigger = trigger;
  profileName.textContent = profile.name;
  profileRole.textContent = profile.role;
  profileImage.src = profile.image;
  profileImage.alt = `Portrait of ${profile.name}`;
  profileImage.style.objectPosition = profile.position || "center 28%";
  setProfileField("about", profile.about);
  setProfileField("research", profile.research);
  setProfileField("hobbies", profile.hobbies);
  setProfileField("quote", profile.quote);
  document.body.classList.add("dialog-open");
  profileDialog.showModal();
}

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
  document.body.classList.remove("nav-open");
  menuButton.querySelector(".sr-only").textContent = "Open navigation";
}

menuButton.addEventListener("click", () => {
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(willOpen));
  navigation.classList.toggle("open", willOpen);
  document.body.classList.toggle("nav-open", willOpen);
  menuButton.querySelector(".sr-only").textContent = willOpen ? "Close navigation" : "Open navigation";
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.querySelectorAll(".member-profile").forEach((member) => {
  member.addEventListener("click", () => openProfile(member));
});

profileCloseButton.addEventListener("click", () => profileDialog.close());

profileDialog.addEventListener("click", (event) => {
  const rect = profileDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (clickedOutside) profileDialog.close();
});

profileDialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  activeProfileTrigger?.focus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeMenu();
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: reduceMotion ? 0 : 0.12, rootMargin: "0px 0px -30px" }
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-24% 0px -62% 0px", threshold: [0, 0.15, 0.4] }
  );

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("in-view"));
}

document.getElementById("year").textContent = new Date().getFullYear();
