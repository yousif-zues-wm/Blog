/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		Blog.find({}).exec(function(err, blog){
			if (err) {
				return res.serverError(err)
			}
			User.find({}).exec(function(err, user){
				if (err) {
					return res.serverError(err)
				}
				res.view({blog: blog, user: user})
			})
		})
	},
	create: function(req, res){
		User.findOne({id: req.cookies.uid}).exec(function(err, user){
			if (err) {
				return res.serverError(err)
			}
			if (!user) {
				res.redirect('/user/login')
			}
			else{
				res.view({user: user})
			}
		})
	},
	createAction: function(req, res){
		User.findOne({id: req.cookies.uid}).exec(function(err, user){
			if (err) {
				return res.serverError(err)
			}
			if (!user) {
				res.redirect('/user/login')
			}
			else{
				Blog.create(req.body).exec(function(err, blog){
					if (err) {
						return res.serverError(err)
					}
					res.redirect('/blog/view/' + blog.id)
				})
			}
		})
	},
	view: function(req, res){
		Blog.findOne(req.param('id')).exec(function(err, blog){
			if (err) {
				return res.serverError(err)
			}
			res.view({blog: blog})
		})
	}
};
