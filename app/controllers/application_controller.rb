class ApplicationController < ActionController::Base
  before_action :allow_params_and_headers

  private

  def allow_params_and_headers
    response.set_header("Access-Control-Allow-Origin", 'http://127.0.0.1:3000')
    params.permit!
  end
end
