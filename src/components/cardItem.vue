<template>
    <!-- class="d-flex justify-content-around" -->
    <div class="myCard text-md-start text-center my-md-0 my-2">
        <div class="myCard__title">{{ $props.title }}</div>
        <div class="myCard__body h4" v-html="$props.data"></div>
    </div>
</template>

<script>
export default {
    props: ['title', 'data'],
}
</script>
