<template>
    <div class="profile">
        <div class="profile-picture" @click="logout">
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.47346 9.51528C8.46869 10.5095 7.08689 11.1234 5.5617 11.1234C2.49006 11.1234 0 8.63335 0 5.5617C0 2.49006 2.49006 0 5.5617 0C7.08689 0 8.46869 0.613923 9.47346 1.60813" transform="translate(0.75354 1.29324)" stroke="url(#paint0_linear)" stroke-width="1.5" stroke-linecap="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.40881 2.63044L3.94495 0.166603C3.7229 -0.0555344 3.36279 -0.0555344 3.14062 0.166603C2.91846 0.388741 2.91846 0.748848 3.14062 0.970985L4.63354 2.46384H0.568848C0.254639 2.46384 0 2.71851 0 3.03263C0 3.34678 0.254639 3.60142 0.568848 3.60142H4.65015L3.14062 5.11097C2.91858 5.33311 2.91858 5.69324 3.14062 5.91538C3.36279 6.13749 3.7229 6.13749 3.94507 5.91538L6.40881 3.45155C6.52209 3.33829 6.57751 3.18961 6.57532 3.04121C6.57751 2.8928 6.52209 2.74369 6.40881 2.63044Z" transform="translate(8.8894 3.82233)" fill="#6C62FF"/>
                <defs>
                <linearGradient id="paint0_linear" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13.6621 -10.4236) scale(28.105) rotate(58.684)">
                <stop stop-color="#8D87E1"/>
                <stop offset="1" stop-color="#4B3EFF"/>
                </linearGradient>
                </defs>
            </svg>

        </div>
        <div class="infos">
            <div class="logged-as">You are using Oauth to fully revoke access go to your</div>
            <div class="profile-name">Figma account settings menu</div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["logout"])
  }
};
</script>

<style scoped>
.profile {
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-picture {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  width: 46.83px;
  height: 46.83px;

  background: #ffffff;
  margin-right: 13px;
  cursor: pointer;
}

.infos {
  display: flex;
  flex-direction: column;
}

.logged-as,
.profile-name {
  font-family: Exo;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 12px;

  color: #ffffff;
}

.profile-name {
  font-weight: 600;
}
</style>
