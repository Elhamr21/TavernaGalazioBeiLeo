import { defineBackend } from "@aws-amplify/backend"
import { auth } from "./auth/resource"
import { data } from "./data/resource"
import { storage } from "./storage/resource"

const backend = defineBackend({
  auth,
  data,
  storage,
})

// Disable public self-signup — the admin user is provisioned out-of-band
// (see README) and placed in the "Admin" Cognito group.
const { cfnUserPool } = backend.auth.resources.cfnResources
cfnUserPool.adminCreateUserConfig = {
  allowAdminCreateUserOnly: true,
}
