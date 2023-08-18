class AddBudgetIdToTags < ActiveRecord::Migration[6.1]
  def change
    add_column :tags, :budget_id, :integer
  end
end
