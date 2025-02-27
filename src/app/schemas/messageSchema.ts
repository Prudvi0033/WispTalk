import { z } from "zod";

export const messageSchema = z.object({
    content : z.string().min(6, "Content must be of atleast 6 characters")
                        .max(300,"Content must be of atmost 300 characters" )
})