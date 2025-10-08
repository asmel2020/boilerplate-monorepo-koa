import z from "zod";

// ✅ Schema de validación
const createUserSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
});

export type CreateUser = z.infer<typeof createUserSchema>;
export { createUserSchema };
