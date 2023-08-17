class BudgetsController < ApplicationController
    def create
        budget = @user.budgets.new(budget_params)
        if budget.valid?
            budget.save
            render json: budget, status: :created
        else
            render json: { errors: budget.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def budget_params
        params.permit(:amount)
    end
end