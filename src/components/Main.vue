<script setup>
  import Lifepaths from 'components/Sections/LifePaths.vue'
  import Summary from 'components/Sections/Summary.vue'
  import CharacterSkills from 'components/Sections/CharacterSkills.vue'
  import CharacterTraits from 'components/Sections/CharacterTraits.vue'
  import CharacterResources from 'components/Sections/CharacterResources.vue'
  import { CharacterData } from 'js/character-data'
</script>

<template>
  <div class="bg-light" style="min-height: 100vh;">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
       <h1 class="navbar-brand m-2">Charred Reborn</h1>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              New Character
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Download Sheet</a>
          </li>
        </ul>
    </nav>
    <b-row class="pt-4 px-2">
      <b-container>
        <!-- <b-row v-if="Object.keys(CharacterData.StockData).length == 0" class="d=flex justify-content-center align-items-center">
            <b-card
              title="Card Title"
              img-src=""
              img-top
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </b-card-text>
              <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>
        </b-row>
        <b-row v-if="Object.keys(CharacterData.StockData).length != 0"> -->
        <b-row>
          <b-col cols="4" class="pt-4">
            <Lifepaths />
          </b-col>
          <b-col cols="8" class="pt-4">
            <b-tabs>
              <b-tab title="Stats and Attributes">
                <Summary />
              </b-tab>
              <b-tab title="Skills and Traits">
                <b-row>
                  <b-col>
                    <CharacterSkills />
                  </b-col>
                  <b-col>
                    <CharacterTraits />
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Circles and Resources">
                <b-row class="mt-1">
                  <b-col>
                    <CharacterResources />
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
        <br>
      </b-container>
    </b-row>
  </div>
</template>