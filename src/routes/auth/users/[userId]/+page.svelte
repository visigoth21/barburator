<script lang="ts">
	import { enhance } from '$app/forms';
	import { cleanPhoneNum, states } from '$lib/components/formats';
	import Notice from '$lib/components/Notice.svelte';

	export let data;
	export let form;

	let running = false;
	let openEditDialog = false;

	$: ({ user } = data);

	$: if (form?.success) {
		openEditDialog = false;
	}
</script>

<dialog open={openEditDialog}>
	<article>
		{#if form?.error}
			<Notice message={form.error} type="error" />
		{/if}

		<legend>
			<button aria-label="Close" rel="prev" on:click={() => (openEditDialog = false)}>X</button>
			<h2>Edit : {user.firstName + ' ' + user.lastName}</h2>
		</legend>

		<form action="?/updateUser" method="post" use:enhance>
			<fieldset>
				<label>
					First name
					<input type="text" name="firstName" placeholder="Last Name" value={user.firstName} />
				</label>

				<label>
					Last name
					<input type="text" name="lastName" placeholder="Last Name" value={user.lastName} />
				</label>

				<label>
					Middle name
					<input type="text" name="middleName" placeholder="Middle" value={user.middleName} />
				</label><br />

				<label>
					Phone
					<input
						type="text"
						name="phoneNumber"
						placeholder="Phone Number"
						value={cleanPhoneNum(user.phoneNumber)}
					/>
				</label>
				<br />

				<label>
					Address
					<input type="text" name="address" placeholder="Address" value={user.address} />
				</label>
				<label>
					<input type="text" name="address2" placeholder="Address 2" value={user.address2} />
				</label>
				<br />
				<label>
					City
					<input type="text" name="city" placeholder="City" value={user.city} />
				</label>
				<lable>
					State
					{#if states}
						<select name="state" id="state">
							{#each states as state}
								{#if state === user.state}
									<option value="state" selected>{state}</option>
								{:else}
									<option value="state">{state}</option>
								{/if}
							{/each}
						</select>
					{/if}
				</lable>
				<label>
					Zip
					<input type="text" name="zip" placeholder="zip" value={user.zip} />
				</label>
			</fieldset>

			<button type="submit">Save</button>
		</form>
	</article>
</dialog>

<section>
	<h1>{user.firstName + ' ' + user.lastName}</h1>

	<div>
		<h2>Actions</h2>

		{#if running}
			<div class="spinner-wrapper">
				<span aria-busy="true">Deleting book {user.lastName}...</span>
			</div>
		{/if}

		<div class="actions">
			<button on:click={() => (openEditDialog = !openEditDialog)} class="action">Edit</button>

			<form
				action="?/deleteBook"
				method="post"
				use:enhance={() => {
					running = true;

					return async ({ update }) => {
						running = false;
						return update();
					};
				}}
			>
				<button class="contrast action">Delete</button>
			</form>
		</div>
	</div>

	<!-- single book code -->
</section>

<!-- ...timestamp,
id: text('id').primaryKey().notNull().$defaultFn(() => generateRandomId()),
email: text('email').unique().notNull(),
hashedPassword: text('hashed_password').notNull(),
isLevel1Admin: integer('is_level_1_admin', { mode: 'boolean' }).default(true),
isLevel2Admin: integer('is_level_2_admin', { mode: 'boolean' }).default(false),
isCustomer: integer('is_customer', { mode: 'boolean' }).default(false),
firstName: text('first_name'),
lastName: text('last_name'),
middleName: text('middle_name'),
phoneNumber: text('phone_number'),
address: text('address'),
address2: text('address2'),
city: text('city'),
state: text('state'),
zip: text('zip'),
company_id: text('company_id'),
isActive: integer('is_active', { mode: 'boolean' }).default(true)

createNewUser,
getUserByEmail,
getUserById,
getAllUsers,
deleteUserById,
editUserById,
isUserActive,
isLevel1Admin,
isLevel2Admin,
isCustomer,
setUsersCompany, -->

<style>
	fieldset {
		background-color: #eeeeee;
	}

	legend {
		background-color: gray;
		color: white;
		padding: 5px 10px;
	}

	input {
		margin: 5px;
	}
</style>
