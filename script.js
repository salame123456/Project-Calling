import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://utemyzlnjdydhenovdkh.supabase.co',
  'sb_publishable_MqDZ89mk8MEr8kGdWatchw_Skd6dMs3'
)

const message_input = document.getElementById("message_input")
const message_output = document.getElementById("message_output")
const send_button = document.getElementById("send_button")

send_button.addEventListener('click', sendMessage)

async function sendMessage(){
  const { error } = await supabase
    .from("messages")
    .upsert({ id: 1, content: message_input.value })

  if (error){ console.log(error) }
}

supabase
  .channel("Calling")
  .on(
    "postgres_changes",
    { event: "*",
      schema: "public",
      table: "messages"
    },
    payload => {
      message_output.textContent = payload.new.content
    }
  )
  .subscribe()

const { data, error } = await supabase
  .from("messages")
  .select("content")

  if (error){ console.log(error) }

if (data.length != 0){
  message_output.textContent = data[0]["content"]
}
