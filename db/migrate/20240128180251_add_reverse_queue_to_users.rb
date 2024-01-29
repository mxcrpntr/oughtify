class AddReverseQueueToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :reverse_queue, :text, default: "{}"
  end
end
