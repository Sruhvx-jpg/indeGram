import { router } from "./trpc";

import { healthRouter } from "./routes/health/route";
import { authRouter } from "./routes/auth/route";
import { userFeatureRouter } from "./routes/features/route";



export const serverRouter = router({
  health: healthRouter,
  auth: authRouter,
  userFeature: userFeatureRouter
});

export { createContext } from "./context";
export { tRPCContext } from "./trpc";
export type ServerRouter = typeof serverRouter;
