<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section class="big-timer">
    <div class="form">
      <div class="form-item">
        <project-select v-model="projectId" class="project-select" />
      </div>
      <div class="form-item">
        <input placeholder="作業内容や備考など" class="description" />
      </div>
    </div>

    <div class="timer">
      <time>01:23:45</time>

      <base-button type="submit" class="is-primary control-button start">
        <icon name="play-icon" />
      </base-button>
      <!-- <base-button
        v-else
        type="submit"
        class="is-danger control-button stop"
      >
        <icon name="square-icon" />
      </base-button> -->
    </div>

    <base-button class="trash-button">
      <icon name="trash-icon" />
    </base-button>
  </section>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import ProjectSelect from '@/components/molecules/project-select';
import { mapGetters } from 'vuex';

export default {
  components: {
    BaseButton,
    ProjectSelect,
    Icon
  },
  computed: {
    ...mapGetters({
      activity: 'activities/working'
    })
  }
};
</script>

<style scoped lang="scss">
.form {
  box-shadow: 0 3px 5px #00000008;
}
.project-select {
  padding: 0 30px;
}
.form-item {
  border-bottom: 1px $border solid;
  padding: 0 0;
  height: 60px;
  align-items: center;
  display: flex;
}
.description {
  height: 100%;
  width: 100%;
  padding: 0 30px;
  border: 0;
}
.trash-button {
  position: absolute;
  bottom: 60px;
  right: 10px;
  color: $red;
}
.timer {
  display: flex;
  position: absolute;
  top: 5px;
  width: 100%;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  z-index: -1;
  time {
    font-size: 46px;
    font-family: Roboto, sans-serif;
    font-weight: 300;
    margin-bottom: 10px;
  }
}
.control-button {
  display: flex;
  align-self: center;
  flex-shrink: 0;
  padding: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  pointer-events: auto;
  box-shadow: 0 3px 3px #00000010;
}
.control-button .icon {
  width: 22px;
  height: 22px;
}
.control-button.start .icon {
  padding-left: 3px;
}
</style>
