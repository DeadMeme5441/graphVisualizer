from genericpath import isfile
import io
import os
import json
import pandas as pd
from flask import Flask, request
from flask_cors import CORS
import seaborn
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.io as plio
import plotly.graph_objs as go
from werkzeug.utils import secure_filename, send_file


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


def generate_pairplot(file_name):

    img_name = file_name.split(".")[0] + ".png"

    if img_name in [
        f for f in os.listdir("./images") if os.path.isfile(os.path.join("./images", f))
    ]:

        return "./images/" + img_name

    df = pd.read_csv("./files/" + file_name)
    seaborn.pairplot(df)

    plt.savefig("./images/" + img_name)

    return "./images/" + img_name


@app.route("/graph/pairplot/<file_name>", methods=["GET"])
def get_pairplot_graph(file_name):

    image_url = generate_pairplot(file_name)

    return send_file(image_url, mimetype="image/gif", environ=request.environ)


@app.route("/graph/correlation/<file_name>", methods=["GET"])
def get_correlation_matrix(file_name):

    df = pd.read_csv("./files/" + file_name)

    corr = df.corr()  # type: ignore

    fig = go.Figure(
        data=go.Heatmap(
            z=corr.values,
            x=corr.index.values,
            y=corr.columns.values,
            colorscale=[
                [0.0, "rgb(165,0,38)"],
                [0.1111111111111111, "rgb(215,48,39)"],
                [0.2222222222222222, "rgb(244,109,67)"],
                [0.3333333333333333, "rgb(253,174,97)"],
                [0.4444444444444444, "rgb(254,224,144)"],
                [0.5555555555555556, "rgb(224,243,248)"],
                [0.6666666666666666, "rgb(171,217,233)"],
                [0.7777777777777778, "rgb(116,173,209)"],
                [0.8888888888888888, "rgb(69,117,180)"],
                [1.0, "rgb(49,54,149)"],
            ],
        )
    )  # type: ignore

    out_fig = plio.to_json(fig)  # type: ignore

    return json.loads(out_fig)


if __name__ == "__main__":
    app.run(debug=True)
