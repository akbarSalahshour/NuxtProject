<template>
  <b-container>
    <!-- محتوای اصلی صفحه -->
    <b-row>
      <!-- پست  -->
      <b-col cols="12" class="my-1 box-container box-animate">
        <!-- عنوان پست -->
        <b-card
          bg-variant="info"
          text-variant="white"
          :header="post.title"
          class="text-center"
        >
          <!-- محتوای پست -->
          <p class="card-text text-justify" v-text="post.body"></p>
        </b-card>
      </b-col>
    </b-row>
    <hr />

    <b-row>
      <!-- نظرات  -->
      <b-col
        cols="12"
        class="my-1"
        :key="index"
        v-for="(commend, index) in commends"
      >
        <!-- نام کاربر -->
        <b-card
          bg-variant="light"
          text-variant="info"
          :header="headerComment(commend)"
          class="text-right"
        >
          <!-- محتوای نظر -->
          <p class="card-text text-justify" v-text="commend.body"></p>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    headerComment(item){
      return `${item.name} (${item.email})`
    }
  },
  mounted() {
    let id = this.$route.params.id;
    let $this = this;
    this.$store.dispatch("posts/loadPost", [$this, id]);
    this.$store.dispatch("commends/loadCommends", [$this, id]);
  },
  computed: {
    ...mapGetters({
      post: "posts/getPosts",
      commends: "commends/getCommends",
    }),
  },
};
</script>