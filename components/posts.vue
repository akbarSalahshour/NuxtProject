
<template>
  <b-container>
    <div v-if="posts.length">
      <b-row>
        <!-- انتخاب کاربر چهت فیلتر پست هایش -->
        <b-col cols="auto" class="mt-1 mb-1">
          <select
            v-model="userIdFilter"
            @change="paginate()"
            class="custom-input"
          >
            <b-select-option value="0">انتخاب نویسنده...</b-select-option>
            <b-select-option
              v-for="user in users"
              :key="user.id"
              :value="user.id"
              v-text="user.name"
            ></b-select-option>
          </select>
        </b-col>
        <!-- ورودی برای چستجو عنوان -->
        <b-col cols="12" xl="3" lg="4" md="4" sm="6" class="mt-1 mb-1">
          <input
            class="custom-input"
            @keyup="paginate()"
            v-model="titleFilter"
            placeholder="جستجو..."
          />
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col class="text-right" :style="{ fontSize: '14px' }">
          <span class="mr-2 ml-2">تعداد در صفحه: </span>
          <!-- انتخاب تعداد نمایش پست در هر صفحه -->
          <select
            class="custom-input"
            @change="paginate()"
            :style="{ width: 'auto' }"
            v-model="perPage"
          >
            <b-select-option
              v-for="(perPageItem, index) in perPageList"
              :key="index"
              :value="perPageItem.value"
              v-text="perPageItem.title"
            ></b-select-option>
          </select>
          <!-- اطلاعات کلی پست ها-->
          <span class="mr-2 ml-2" v-text="textTotal()"></span>
        </b-col>
      </b-row>
      <hr />
      <!-- محتوای اصلی صفحه -->
      <b-row id="post_box_parent">
        <!-- پست ها -->
        <b-col
          cols="12"
          class="my-1 box-container box-animate"
          :key="index"
          v-for="(post, index) in paginatedPosts"
        >
          <!-- عنوان پست -->
          <b-card
            bg-variant="light"
            text-variant="info"
            :header="post.title"
            class="text-center"
          >
            <!-- محتوای پست -->
            <p class="card-text text-justify">{{ post.body }}</p>
            <!-- دکمه مشاهده نطرات -->
            <nuxt-link :to="`/${post.id}`" class="btn btn-info text-white float-left col-12 col-xl-2 col-lg-3 col-md-5">نظرات</nuxt-link>
          </b-card>
        </b-col>
      </b-row>
      <!-- صفحه بندی -->
      <b-row v-if="perPage != -1 && totalItem > perPage" class="mt-2 mb-2">
        <!-- نمایش بده اگر: -->
        <!-- 1.کاربر مشاهده همه رو انتخاب نکرده است -->
        <!-- 2.تعداد صفحات بیش از یکی است -->
        <b-col md="6" class="m-auto">
          <b-pagination
            @change="paginate"
            :total-rows="totalItem"
            :per-page="perPage"
            class="my-0"
          />
        </b-col>
      </b-row>
    </div>
    <square-waiting v-else></square-waiting>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import squareWaiting from "./squareWaiting.vue";
/*interface PostInterface {
  post_filter:()=>any;
}
class titleFilter implements PostInterface{
  public post_filter(){
    return 5;
  }
}*/
export default {
  components: { squareWaiting },
  data() {
    return {
      // تعداد نمایش پست ها در هر صفحه
      perPage: 5,
      // تعداد کل
      totalItem: 0,
      // پست های فیلتر شده برای نمایش
      paginatedPosts: [],
      //اسکرول صفحه
      windowScroll: 0,
      //بر اساس عنوان
      titleFilter: "",
      //بر اساس کاربر
      userIdFilter: 0,
    };
  },
  methods: {
    // برگشت اطلاعات در مورد تعداد کل پست ها و صفحات
    textTotal() {
      return `تعداد کل: ${this.totalItem} - تعداد صفحات: ${Math.ceil(
        this.totalItem / this.perPage
      )}`;
    },
    paginate(page_number = 1) {
      if (page_number > 1) {
        // اگر صفحه ای انتخاب شده به بالای صفحه برو
        jq("html,body").animate(
          {
            scrollTop: jq("#post_box_parent").offset().top - 400,
          },
          500
        );
      }
      if (this.titleFilter == "") {
        // پست ها دوباره محو می شوند
        jq("#post_box_parent .box-container").addClass("box-animate");
        setTimeout(() => {
          this.windowScroll = 0;
        }, 500);
      }
      //اگر جستجو برا اساس عنوان صورت گرفته همه پست ها از اول نمایش داده شود
      else jq("#post_box_parent .box-container").removeClass("box-animate");
      let posts = [];
      //اگر کاربری انتخاب شده باشد
      if (this.userIdFilter != 0) {
        //فیلتر بر اساس کاربر انتخاب شده + متن داخل باکس جستجو عنوان
        posts = this.posts.filter((postItem) => {
          return (
            this.userIdFilter == postItem.userId &&
            postItem.title.includes(this.titleFilter)
          );
        });
      }
      //فیلتر فقط بر اساس متن داخل باکس جستجو پست ها
      else
        posts = this.posts.filter((postItem) =>
          postItem.title.includes(this.titleFilter)
        );
      this.totalItem = posts.length;
      //اگر تعداد نمایش همه رو انتخاب کرده است
      //همه را نمایش بده
      if (this.perPage == -1) this.paginatedPosts = posts;
      // تعداد محدود هر صفحه را نمایش بده
      else
        this.paginatedPosts = posts.slice(
          (page_number - 1) * this.perPage,
          page_number * this.perPage
        );
    },
    // برای نمایش باکس ها به صورت انیمیشن
    onScroll() {
      // فاصله اسکرول از بالا
      let scrollTop = jq(window).scrollTop();
      // اگر اسکرول صفحه رو به پایین بود
      if (scrollTop > this.windowScroll) {
        jq("#post_box_parent .box-animate").each(function () {
          // هر پستی که از پایین صفحه 100 پیکسل بالاتر بود
          if (jq(this).offset().top < scrollTop + jq(window).height() - 100) {
            jq(this).removeClass("box-animate");
          }
        });
        this.windowScroll = scrollTop;
      }
    },
  },
  mounted() {
    // اعمال تغییرات بر روی داده های فایل store
    this.$store.dispatch("posts/loadPosts", this);
    this.$store.dispatch("users/loadUsers", this);
    //هر وقت اسکرول شد onScroll رو فراخوانی می کنه
    window.addEventListener("scroll", this.onScroll);
  },
  watch: {
    // در صورت تغییر منبع اصلی متغییر پست ها اصلاح شود
    posts(val) {
      this.paginate();
    },
  },
  computed: {
    // واکشی stats از فایل store
    ...mapGetters({
      posts: "posts/getPosts",
      users: "users/getUsers",
      perPageList: "paginate/getPerPageList",
    }),
  },
};
</script>
<style lang="sass">
#post_box_parent
  .box-container
    transition: .5s ease-out
    position: relative
    bottom: 0
    opacity: 1
  .box-animate
    bottom: -100px
    opacity: 0
</style>