class AddTransactionIdToTags < ActiveRecord::Migration[6.1]
  def change
    add_column :tags, :transaction_id, :integer
  end
end
