class Tag < ApplicationRecord
    has_many :transactions
    belongs_to :budget

    # need to remove transaction id from scheme from tag...
end