<template>
  <v-container fluid px-0>
    <v-row class="text-center mb-12">
      <v-col cols="3" offset="3">
        <v-img
          src="@/assets/hero.png"
          height="600px"
          contain
        />
      </v-col>
      <v-col cols="3" class="d-flex flex-column justify-center font-weight-black">
        <v-subheader class="text-h5">
          SupPORT help center
        </v-subheader>
        <div class="hero-text text-left pl-4">
          Get assistance right now!
        </div>
        <div class="text-subtitle-1 grey--text text--darken-4 text-left pl-4 mb-8">
          SupPORT answers your questions right on time. Start using it now.
        </div>
        <v-btn
          color="#090b3c"
          class="text-body-1 text-none white--text ml-4"
          width="200px"
          large
        >
          Start asking questions
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column grey lighten-4">
      <v-col cols="8" offset="2">
        <div class="text-h5 text-center my-10">
          Trusted by customers around the world
        </div>
        <div class="d-flex justify-around">
          <v-card
            v-for="img in images"
            :key="img.name"
            class="mx-2"
            width="25%"
            color="white"
            outlined
          >
            <div class="d-flex flex-column flex-no-wrap justify-space-between align-center mb-4">
              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img
                  :src="img.url"
                  height="100px"
                  class="my-4"
                  contain
                />
              </v-avatar>
              <div class="text-center">
                <div
                  class="text-body-1 text-center"
                  v-text="img.name"
                />

                <v-card-subtitle v-text="img.title" />
                <v-rating
                  color="rgb(8, 10, 61)"
                  dense
                  readonly
                  value="5"
                />
              </div>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row class="my-8">
      <v-card
        class="mx-auto text-center"
        color="rgb(8, 10, 61)"
        dark
        width="600"
        max-width="600"
      >
        <v-card-text>
          <v-sheet color="rgb(12, 15, 91.5)">
            <v-sparkline
              :value="[123, 210, 345, 475, 569]"
              color="rgba(255, 255, 255, .7)"
              height="100"
              padding="24"
              stroke-linecap="round"
              smooth
            >
              <template v-slot:label="item">
                {{ item.value }}
              </template>
            </v-sparkline>
          </v-sheet>
        </v-card-text>

        <v-card-text>
          <div class="text-h6 font-weight-thin">
            Join increasing number of satisfied customers
          </div>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

// Photo by <a href="https://unsplash.com/@lunarts?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Volodymyr Hryshchenko</a> on <a href="https://unsplash.com/s/photos/chat?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})

export default class MainPage extends Vue {
  name = 'MainPage'

  images = [
    { name: 'Bender Bending Rodriguez', title: '"Bite my shiny metal axe. This is definitely 30th century thing."', url: 'https://robohash.org/omnisestvel.png?size=100x100&set=set1' },
    { name: 'Lieutenant Data', title: '"It is like using an alien technology. All parameters are within normal limits."', url: 'https://robohash.org/voluptatedelenitianimi.bmp?size=100x100&set=set1' },
    { name: 'Robocop', title: '"It is like talking to a real robot! It is like going to good old days."', url: 'https://robohash.org/minimasequiconsectetur.png?size=100x100&set=set1' },
    { name: 'Rosie', title: '"The chatbot was very friendly and helpful. I suggest it to everybody who does not have a life."', url: 'https://robohash.org/repellatsintmolestiae.jpg?size=100x100&set=set1' },
  ]
}
</script>

<style lang='scss' scoped>
.hero-text {
  font-size: 45px;
  color: #080a3d;
  line-height: 50px;
  text-align: left;
}
</style>
