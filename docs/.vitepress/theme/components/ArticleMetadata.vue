<script lang="ts" setup>
import { useData } from "vitepress";
import { computed, ref, onMounted } from "vue";
import { countWord } from "../utils/functions";

const { page, frontmatter: fm } = useData();
const createdDate = computed(() => {
  const created = fm.value.created || page.value.frontmatter?.created;
  return created ? new Date(created) : null;
});
const date = computed(() => new Date(page.value.lastUpdated!));

const wordCount = ref(0);
const imageCount = ref(0);

const wordTime = computed(() => {
  return (wordCount.value / 275) * 60;
});

const imageTime = computed(() => {
  const n = imageCount.value;
  if (imageCount.value <= 10) {
    // 等差数列求和
    return n * 13 + (n * (n - 1)) / 2;
  }
  return 175 + (n - 10) * 3;
});

// 阅读时间
const readTime = computed(() => {
  return Math.ceil((wordTime.value + imageTime.value) / 60);
});

function analyze() {
  document.querySelectorAll(".meta-des").forEach((v) => v.remove());
  const docDomContainer = window.document.querySelector("#VPContent");
  const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(
    ".content-container .main img"
  );
  imageCount.value = imgs?.length || 0;
  const words =
    docDomContainer?.querySelector(".content-container .main")?.textContent ||
    "";
  wordCount.value = countWord(words);
}

onMounted(() => {
  // 初始化时执行一次
  analyze();
});
</script>


<template>
  <div class="word">
    <p>
      <svg
        t="1766062461020"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4875"
        id="mx_n_1766062461021"
        width="14"
        height="14"
      >
        <path
          d="M829.568 945.984H194.432A129.856 129.856 0 0 1 64 816.96v-40h59.712v40c0 38.208 31.68 69.248 70.72 69.248h635.136c38.976 0 70.72-31.04 70.72-69.248V256.448c0-38.208-31.68-69.248-70.72-69.248H194.432c-38.976 0-70.72 31.04-70.72 69.248v374.848H64V256.448c0-71.104 58.496-128.96 130.432-128.96h635.136c71.936 0 130.432 57.856 130.432 128.96v560.512a129.856 129.856 0 0 1-130.432 129.024z"
          p-id="4876"
          fill="#67676c"
        ></path>
        <path
          d="M124.864 358.72h780.288v61.376H124.864zM465.152 533.696h298.88v53.76h-298.88zM245.888 665.92h518.208v53.76H245.888zM316.992 78.016h60.352v158.656h-60.352zM673.92 78.016h60.352v158.656h-60.352z"
          p-id="4877"
          fill="#67676c"
        ></path>
      </svg>
      <span class="meta-text">更新: {{ date.toLocaleDateString() }}</span>
      <svg
        t="1766040148919"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2570"
        width="14"
        height="14"
      >
        <path
          d="M294.4 54.72A261.504 261.504 0 0 0 66.752 233.728c-2.944 8.832-7.04 24.576-9.152 34.944l-3.84 18.88v448.896l3.84 18.88c19.904 98.304 85.76 172.928 178.752 202.624 40.064 12.8 28.48 12.288 275.648 12.288 206.976 0 222.144-0.192 238.912-3.136a263.36 263.36 0 0 0 216.192-216.192c2.944-16.768 3.136-31.936 3.136-238.912s-0.192-222.144-3.136-238.912C950.016 175.68 882.24 96.64 790.208 66.816A252.48 252.48 0 0 0 726.4 54.592c-24.704-1.92-407.36-1.792-432 0.128m448.832 80.576c68.032 15.488 118.08 59.52 139.136 122.432 9.408 27.968 9.024 19.008 9.728 237.184 0.704 210.304 0.128 235.52-6.208 259.456A184.256 184.256 0 0 1 729.6 890.688c-21.376 2.624-413.824 2.624-435.2 0-76.288-9.344-136.768-62.784-157.248-138.88-3.008-11.456-3.2-22.272-3.2-239.808V284.16l3.968-14.4c20.8-76.224 84.416-130.048 161.472-136.64 8.512-0.704 109.184-1.152 223.68-0.96 183.552 0.32 209.664 0.704 220.16 3.136M311.168 318.208a38.592 38.592 0 0 0-26.24 46.72c2.368 8.768 11.712 19.584 21.312 24.768 6.784 3.648 8.512 3.712 86.72 4.224l79.808 0.512v171.136c0 185.344-0.256 180.608 9.152 192.96 5.888 7.68 20.096 14.592 30.08 14.592a44.48 44.48 0 0 0 30.08-14.592c9.408-12.352 9.152-7.616 9.152-192.96V394.432l79.808-0.512c78.208-0.512 79.936-0.576 86.72-4.224 21.248-11.392 28.544-34.752 16.96-54.528a36.096 36.096 0 0 0-22.592-17.088c-11.2-3.392-390.144-3.264-400.96 0.128"
          fill="#67676c"
          p-id="2571"
        ></path>
      </svg>
      <span class="meta-text">字数: {{ wordCount }} 字</span>
      <svg
        t="1766040253904"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3930"
        width="14"
        height="14"
      >
        <path
          d="M510.47 114.16c54.03 0 106.41 10.57 155.67 31.4 47.62 20.14 90.41 49 127.17 85.76 36.76 36.76 65.61 79.55 85.76 127.17 20.84 49.26 31.4 101.64 31.4 155.67s-10.57 106.41-31.4 155.67c-20.14 47.62-48.99 90.41-85.76 127.17-36.76 36.76-79.55 65.61-127.17 85.76-49.26 20.84-101.64 31.4-155.67 31.4s-106.41-10.57-155.67-31.4c-47.62-20.14-90.41-48.99-127.17-85.76-36.76-36.76-65.61-79.55-85.76-127.17-20.84-49.26-31.4-101.64-31.4-155.67s10.57-106.41 31.4-155.67c20.14-47.62 49-90.41 85.76-127.17 36.76-36.76 79.55-65.61 127.17-85.76 49.26-20.84 101.63-31.4 155.67-31.4m0-80c-265.1 0-480 214.9-480 480s214.9 480 480 480 480-214.9 480-480-214.91-480-480-480z"
          fill="#67676c"
          p-id="3931"
        ></path>
        <path
          d="M707.26 631.17l-173.17-99.98V329.95c0-22.09-17.91-40-40-40s-40 17.91-40 40V553c0 0.17 0.01 0.34 0.01 0.51-0.26 14.08 6.93 27.88 19.99 35.42l193.16 111.52c19.13 11.05 43.6 4.49 54.64-14.64 11.06-19.14 4.5-43.6-14.63-54.64z"
          fill="#67676c"
          p-id="3932"
        ></path>
      </svg>
      <span class="meta-text">阅读: {{ readTime }} 分钟</span>
    </p>
  </div>
</template>

<style>
.word {
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
}

.icon {
  display: inline-block;
  transform: translate(0px, 2px);
}

.meta-text {
  display: inline-block;
  margin-left: 4px;
  margin-right: 10px;
}
</style>