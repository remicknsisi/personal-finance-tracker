class DropBudgetIdFromTags < ActiveRecord::Migration[6.1]
  def change
    remove_column :tags, :budget_id, :integer
  end
end
