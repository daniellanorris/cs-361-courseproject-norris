import 'dotenv/config'
import { createClient } from "@supabase/supabase-js";



export async function confirmAuthentication(email, password) {

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    )

    try {

        const { data, error } = await supabase
            .from("Users")
            .select("*")
            .eq("email", email)
            .eq("password", password)
            .single();
        if (error || !data) {
            return null;
        }

        return data;

    }

    catch (error) {
        console.error("DB Error:", error.message);
    }

}

