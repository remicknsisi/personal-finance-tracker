class RemoveTransactionIdFromTags < ActiveRecord::Migration[6.1]
  def change
    remove_column :tags, :transaction_id
  end
end
