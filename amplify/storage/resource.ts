import { defineStorage } from "@aws-amplify/backend"

/**
 * Public read for every path (images render on the public site with no
 * login), write/delete restricted to the "Admin" Cognito group.
 */
export const storage = defineStorage({
  name: "tavernaGalazioMedia",
  access: (allow) => ({
    "settings/*": [
      allow.guest.to(["read"]),
      allow.groups(["Admin"]).to(["read", "write", "delete"]),
    ],
    "hero/*": [
      allow.guest.to(["read"]),
      allow.groups(["Admin"]).to(["read", "write", "delete"]),
    ],
    "about/*": [
      allow.guest.to(["read"]),
      allow.groups(["Admin"]).to(["read", "write", "delete"]),
    ],
    "menu/*": [
      allow.guest.to(["read"]),
      allow.groups(["Admin"]).to(["read", "write", "delete"]),
    ],
    "gallery/*": [
      allow.guest.to(["read"]),
      allow.groups(["Admin"]).to(["read", "write", "delete"]),
    ],
    "events/*": [
      allow.guest.to(["read"]),
      allow.groups(["Admin"]).to(["read", "write", "delete"]),
    ],
  }),
})
