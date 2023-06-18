<template>
    <!-- class="d-flex justify-content-around" -->
    <div class="myCard text-md-start text-center">
        <div class="myCard__title">{{ $props.title }}</div>
        <div class="myCard__body" v-html="$props.data"></div>
    </div>
</template>

<script>
export default {
    props: ['title', 'data'],
}
</script>
