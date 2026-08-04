import { defineAuth } from "@aws-amplify/backend"

/**
 * Single-admin auth: self-signup is disabled at the CFN level in
 * amplify/backend.ts (allowAdminCreateUserOnly). The admin user is
 * provisioned out-of-band via the AWS CLI (see README) and placed in the
 * "Admin" group, which every Data/Storage authorization rule keys off.
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  groups: ["Admin"],
})
