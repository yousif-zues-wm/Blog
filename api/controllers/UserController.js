/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function(req, res){
		res.redirect('/')
	},
	register: function(req, res){
		User.findOne({id: req.cookies.uid}).exec(function(err, user){
			if (err) {
				return res.serverError(err)
			}
			if (!user) {
				res.view({user: user})
			}
			else{
				res.redirect('/user/profile/' + user.name)
			}
		})
	},
	registerAction: function(req, res){
		User.create(req.body).exec(function(err, user){
			if (err) {
				return res.serverError(err)
			}
			if (!user) {
				res.redirect('/user/register')
			}
			else{
				res.cookie('uid', user.id)
				res.redirect('/user/profile/' + user.name)
			}
		})
	},
	profile: function(req, res){
		User.findOne({name: req.param('name')}).exec(function(err, user){
			if (err) {
				return res.serverError(err)
			}
			if (!user) {
				res.redirect('/')
			}
			else{
				Blog.find({author: user.name}).exec(function(err, blog){
					if (err) {
						return res.serverError(err)
					}
					if (!blog) {
						blog = 'No Posts Yet'
					}
					res.view({user: user, blog: blog})
				})
			}
		})
	},
	login: function(req, res){
		User.findOne({id: req.cookies.uid}).exec(function(err, user){
			if (err) {
				return res.serverError(err)
			}
			if (!user) {
				res.view({user: user})
			}
			else{
				res.redirect('/blog')
			}
		})
	},
	loginAction: function(req, res){
		User.findOne({name: req.param("name"), password: req.param('password')}).exec(function(err, user){
			if (err) {
				return res.serverError(err)
			}
			if (!user) {
				res.redirect('/user/login')
			}
			else{
				res.cookie('uid', user.id)
				res.redirect('/')
			}
		})
	},
	logout: function(req, res){
		res.clearCookie('uid', {path:'/'});
		res.redirect('/')
	}
};
