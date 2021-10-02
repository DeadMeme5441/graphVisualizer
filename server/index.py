import os
import json
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import plotly.express as px
import plotly.io as plio
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)


def generate_json(in_df):

    out_json = []
    for col in in_df.columns:
        tempdict = {}
        tempdict["colName"] = col
        tempdict["values"] = in_df[col].tolist()
        out_json.append(tempdict)

    return out_json


@app.route("/json/<file_name>", methods=["GET"])
def get_file_columns(file_name):

    file_name = file_name + ".csv"
    in_file = open(os.path.join("files", file_name))

    df = pd.read_csv(in_file)
    df = df.fillna(0)  # type: ignore
    out_json = generate_json(df)

    print(type({"data": out_json}))

    return {"data": out_json}


@app.route("/files", methods=["GET"])
def list_files():

    file_list = [
        f for f in os.listdir("files") if os.path.isfile(os.path.join("files", f))
    ]

    return {"files": file_list}


@app.route("/upload", methods=["POST"])
def upload_file():
    upFile = request.files["file"]
    upFile.save(os.path.join("files/" + secure_filename(upFile.filename)))  # type: ignore

    return {"result": "File Uploaded"}


@app.route("/graph/regression", methods=["POST"])
def get_regression_graph():

    req = request.json

    print(req)
    xAxis = request.json["X"]  # type: ignore
    yAxis = request.json["Y"]  # type: ignore

    df = pd.DataFrame(
        {xAxis["colName"]: xAxis["values"], yAxis["colName"]: yAxis["values"]}
    )

    fig = px.scatter(
        df,
        x=xAxis["colName"],
        y=yAxis["colName"],
        opacity=0.65,
        trendline="ols",
        trendline_color_override="darkblue",
    )

    out_fig = plio.to_json(fig)  # type: ignore

    return json.loads(out_fig)


@app.route("/graph/timeseries", methods=["POST"])
def get_timeseries_graph():

    req = request.json

    xAxis = request.json["X"]  # type: ignore
    yAxis = request.json["Y"]  # type: ignore

    df = pd.DataFrame(
        {xAxis["colName"]: xAxis["values"], yAxis["colName"]: yAxis["values"]}
    )
    df[xAxis["colName"]] = pd.to_datetime(df[xAxis["colName"]])  # type: ignore

    fig = px.line(df, x=xAxis["colName"], y=yAxis["colName"])

    out_fig = plio.to_json(fig)  # type: ignore

    return json.loads(out_fig)


@app.route("/graph/jointplot", methods=["POST"])
def get_jointplot_graph():

    xAxis = request.json["X"]  # type: ignore
    yAxis = request.json["Y"]  # type: ignore
    df = pd.DataFrame(
        {xAxis["colName"]: xAxis["values"], yAxis["colName"]: yAxis["values"]}
    )

    fig = px.scatter(
        df,
        x=xAxis["colName"],
        y=yAxis["colName"],
        marginal_x="histogram",
        marginal_y="histogram",
        opacity=0.65,
        trendline="ols",
        trendline_color_override="darkblue",
    )

    out_fig = plio.to_json(fig)  # type: ignore

    return json.loads(out_fig)


if __name__ == "__main__":
    app.run(debug=True)
