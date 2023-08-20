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

    def index
        budgets = Budget.all
        render json: budgets, status: :ok
    end

    def destroy
        budget = Budget.find_by(id: params[:id])
        if @user && @user.id == budget.user_id
            budget.destroy
            render json: budget, status: :ok
        else
            render json: { error: "You can only delete your own budgets!" }, status: :unauthorized
        end
    end

    private

    def budget_params
        params.permit(:amount)
    end
end