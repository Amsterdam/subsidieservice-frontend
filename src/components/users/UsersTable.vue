<template>
  <div>
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Real Name</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Admin</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in data" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.real_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone_number }}</td>
          <td>
            <span v-if="user.is_admin">🗸</span>
          </td>
          <td>
            <button class="action secundary-blue" @click="$emit('edit', user)">
              <span>Update</span>
            </button>
            <button class="action primary" @click="$emit('delete', user)">
              <span>Delete</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { User } from "@/models/api/user";

@Component
export default class UsersTable extends Vue {
  @Prop()
  private data!: User[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
