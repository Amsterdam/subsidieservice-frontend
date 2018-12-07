<template>
  <section class="container" id="admin-panel">
    <h1>Administration</h1>
    <UsersTable :data="users" @edit="openUserEdit" @delete="deleteUser"></UsersTable>
    <button class="action primary" @click="openUserCreation">
      <span>Create</span>
    </button>

    <ErrorSummary v-if="error" :errors="[error]"></ErrorSummary>

    <UserEdit
      v-if="showEditUser"
      @submit="resetPassword"
      :username="editedUser.username"
      @cancel="editedUser = {}"
    ></UserEdit>
    <UserCreation v-if="showCreateUser" @submit="createUser" @cancel="showCreateUser = false"></UserCreation>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CreateUserModel } from "@/models/create-user-model";
import { User } from "@/models/api/user";

import ErrorSummary from "@/components/ErrorSummary.vue";
import UsersTable from "@/components/users/UsersTable.vue";
import UserEdit from "@/components/users/UserEdit.vue";
import UserCreation from "@/components/users/UserCreation.vue";
import userService from "@/services/user/user.service";

@Component({
  components: { UsersTable, UserEdit, UserCreation, ErrorSummary }
})
export default class Admin extends Vue {
  private users: User[] = [];
  private editedUser: User = {};
  private showCreateUser = false;

  private error: string = "";

  get showEditUser() {
    return !!this.editedUser && !!this.editedUser.username;
  }

  async mounted() {
    try {
      this.users = await userService.getAllUsers();
      this.error = "";
    } catch (error) {
      this.error = "Failed to get all users. Error: " + error.message;
    }
  }

  openUserCreation() {
    this.showCreateUser = true;
    this.editedUser = {};
    this.error = "";
  }

  openUserEdit(userToEdit: User) {
    this.editedUser = userToEdit;
    this.showCreateUser = false;
    this.error = "";
  }

  async resetPassword(user: { username: string; password: string }) {
    try {
      await userService.resetPassword(user.username, user.password);
      this.editedUser = {};
      this.error = "";
    } catch (error) {
      this.error = "Failed to reset password. Error: " + error.message;
    }
  }

  async createUser(user: CreateUserModel) {
    try {
      await userService.create(user);
      this.users = await userService.getAllUsers();
      this.error = "";
      this.showCreateUser = false;
    } catch (error) {
      this.error = "Failed to create user. Error: " + error.message;
    }
  }

  async deleteUser(user: User) {
    try {
      if (user.username) {
        await userService.deleteUser(user.username);
        this.users = await userService.getAllUsers();
        this.error = "";
        throw new Error("asdasd");
      }
    } catch (error) {
      this.error = "Failed to delete user. Error: " + error.message;
    }
  }
}
</script>
