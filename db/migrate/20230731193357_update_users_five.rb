class UpdateUsersFive < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :queue, :user_queue
  end
end
