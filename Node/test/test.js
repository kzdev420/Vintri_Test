var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

var server = require("../app");
var DB = require("../database");

describe("sample_tests", function() {

	this.beforeEach((done) => {
		DB.BUILD_SCHEMA();

		done();
	});

	this.afterEach((done) => {
		DB.BUILD_SCHEMA();

		done();
	});

	describe("/GET index", () => {
		it("it should GET the unauthorized error when header does not include x-user", (done) => {
			chai.request(server)
				.get("/")
				.end((err, res) => {
					res.should.have.status(401);
					expect(err).to.be.not.null;

					done();
				});
		});

		it("it should GET the unauthorized error when x-user is not invalid email", (done) => {
			chai.request(server)
				.get("/")
				.set("x-user", "tester")
				.end((err, res) => {
					res.should.have.status(401);
					expect(err).to.be.not.null;

					done();
				});
		});

		it("it should GET the responds successfully", (done) => {
			chai.request(server)
				.get("/")
				.set("x-user", "tester@mail.com")
				.end((err, res) => {
					res.should.have.status(200);
					expect(err).to.be.null;

					done();
				});
		});
	});

	describe("/GET beers", () => {
		it("it should GET all the beers", (done) => {
			chai.request(server)
				.get("/beers")
				.set("x-user", "tester@mail.com")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.not.null;
					expect(res.body).to.be.not.empty;
					expect(res.body[0]).to.include.keys(["id", "name", "description", "first_brewed", "food_pairing"]);

					done();
				});
		});
	});

	describe("/POST beers", () => {
		it("it should CREATE or UPDATE the rating and comments", (done) => {
			chai.request(server)
				.post("/beers/1")
				.set("x-user", "tester@mail.com")
				.send({
					rating: 5,
					comments: "very good"
				})
				.end((err, res) => {
					const logs = DB.GET_RECORDS("logs");

					res.should.have.status(200);
					expect(logs.length).to.be.greaterThan(0);

					done();
				});
		});

		it("it should GET the errors if the rating is not in 1 ~ 5", (done) => {
			chai.request(server)
				.post("/beers/1")
				.set("x-user", "tester@mail.com")
				.send({
					rating: 6,
					comments: "very good"
				})
				.end((err, res) => {
					const logs = DB.GET_RECORDS("logs");

					res.should.have.status(400);
					expect(err).to.be.not.null;
					expect(logs.length).to.be.greaterThan(0);

					done();
				});
		});
	});
});
