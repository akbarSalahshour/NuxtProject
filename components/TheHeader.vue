<template>
  <b-navbar id="navbar" toggleable="md">
    <div>
      <b-navbar-brand class="md-mx-auto">
        <nuxt-link to="/" exact
          ><img
            class="navbar-logo"
            src="@/assets/img/nuxt_logo.png"
            alt="Nuxt Logo"
        /></nuxt-link>
      </b-navbar-brand>
      <div class="mr-auto d-flex">
        <div class="header-icon">
          <a href="#" class="fb-ic"
            ><i class="fab fa-telegram fa-lg white-text mr-md-1 mr-2 fa-2x"> </i
          ></a>
        </div>
        <div class="header-icon">
          <a href="#" class="fb-ic"
            ><i class="fab fa-facebook fa-lg white-text mr-md-1 mr-2 fa-2x"> </i
          ></a>
        </div>
        <div class="header-icon">
          <a href="#" class="ins-ic"
            ><i class="fab fa-instagram fa-lg white-text mr-md-1 mr-2 fa-2x">
            </i
          ></a>
        </div>
      </div>
    </div>
  </b-navbar>
</template>