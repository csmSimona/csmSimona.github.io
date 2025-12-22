---
layout: doc
layoutClass: m-nav-layout
sidebar: false
prev: false
next: false
outline: [2, 3, 4]
---

<style src="./index.scss"></style>

<script setup>
import { NAV_DATA } from './navData.ts'
</script>


# 实用导航

::: info 教程
此导航内容来自 [茂茂物语 | 前端导航](https://fe-nav.netlify.app/nav/)
:::

<MyNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>
