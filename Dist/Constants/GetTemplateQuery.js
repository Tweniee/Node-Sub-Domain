"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    query: "[
};
{
    '$match';
    {
        'dietitian';
        new ObjectId('64917dc6b858bd009252e120');
    }
}
{
    '$lookup';
    {
        'from';
        'dashboards',
            'localField';
        'tabName',
            'foreignField';
        '_id',
            'as';
        'tabName',
            'pipeline';
        [
            {
                '$match': {
                    'isActive': true,
                    'isDeleted': false
                }
            }, {
                '$project': {
                    'isActive': 0,
                    'isDeleted': 0,
                    'createdAt': 0,
                    'updatedAt': 0
                }
            }
        ];
    }
}
{
    '$unwind';
    {
        'path';
        '$tabName';
    }
}
{
    '$lookup';
    {
        'from';
        'templatebannersections',
            'localField';
        'sectionOne',
            'foreignField';
        '_id',
            'as';
        'sectionOne',
            'pipeline';
        [
            {
                '$match': {
                    'isActive': true,
                    'isDeleted': false
                }
            }, {
                '$project': {
                    'isActive': 0,
                    'isDeleted': 0,
                    'createdAt': 0,
                    'updatedAt': 0
                }
            }, {
                '$lookup': {
                    'from': 'templatetexts',
                    'localField': 'text',
                    'foreignField': '_id',
                    'as': 'text',
                    'pipeline': [
                        {
                            '$match': {
                                'isActive': true,
                                'isDeleted': false
                            }
                        }, {
                            '$project': {
                                'isActive': 0,
                                'isDeleted': 0,
                                'createdAt': 0,
                                'updatedAt': 0
                            }
                        }, {
                            '$lookup': {
                                'from': 'templatetexts',
                                'localField': 'subHeading',
                                'foreignField': '_id',
                                'as': 'subHeading',
                                'pipeline': [
                                    {
                                        '$match': {
                                            'isActive': true,
                                            'isDeleted': false
                                        }
                                    }, {
                                        '$project': {
                                            'isActive': 0,
                                            'isDeleted': 0,
                                            'createdAt': 0,
                                            'updatedAt': 0
                                        }
                                    }, {
                                        '$project': {
                                            '_id': 1,
                                            'text': 1
                                        }
                                    }
                                ]
                            }
                        }, {
                            '$unwind': {
                                'path': '$subHeading'
                            }
                        }, {
                            '$project': {
                                '_id': 1,
                                'subHeading': 1,
                                'text': 1
                            }
                        }, {
                            '$addFields': {
                                'subHeading': '$subHeading.text'
                            }
                        }
                    ]
                }
            }, {
                '$unwind': {
                    'path': '$text'
                }
            }, {
                '$addFields': {
                    'subHeading': '$text.subHeading',
                    'text': '$text.text'
                }
            }
        ];
    }
}
{
    '$unwind';
    {
        'path';
        '$sectionOne';
    }
}
{
    '$lookup';
    {
        'from';
        'templatecardsections',
            'localField';
        'sectionTwo',
            'foreignField';
        '_id',
            'as';
        'sectionTwo',
            'pipeline';
        [
            {
                '$match': {
                    'isActive': true,
                    'isDeleted': false
                }
            }, {
                '$project': {
                    'isActive': 0,
                    'isDeleted': 0,
                    'createdAt': 0,
                    'updatedAt': 0
                }
            }, {
                '$lookup': {
                    'from': 'templatetexts',
                    'localField': 'text',
                    'foreignField': '_id',
                    'as': 'text',
                    'pipeline': [
                        {
                            '$match': {
                                'isActive': true,
                                'isDeleted': false
                            }
                        }, {
                            '$project': {
                                'isActive': 0,
                                'isDeleted': 0,
                                'createdAt': 0,
                                'updatedAt': 0
                            }
                        }, {
                            '$lookup': {
                                'from': 'templatetexts',
                                'localField': 'subHeading',
                                'foreignField': '_id',
                                'as': 'subHeading',
                                'pipeline': [
                                    {
                                        '$match': {
                                            'isActive': true,
                                            'isDeleted': false
                                        }
                                    }, {
                                        '$project': {
                                            'isActive': 0,
                                            'isDeleted': 0,
                                            'createdAt': 0,
                                            'updatedAt': 0
                                        }
                                    }, {
                                        '$project': {
                                            '_id': 1,
                                            'text': 1
                                        }
                                    }
                                ]
                            }
                        }, {
                            '$unwind': {
                                'path': '$subHeading'
                            }
                        }, {
                            '$project': {
                                '_id': 1,
                                'subHeading': 1,
                                'text': 1
                            }
                        }, {
                            '$addFields': {
                                'subHeading': '$subHeading.text'
                            }
                        }
                    ]
                }
            }, {
                '$unwind': {
                    'path': '$text'
                }
            }, {
                '$addFields': {
                    'subHeading': '$text.subHeading',
                    'text': '$text.text'
                }
            }
        ];
    }
}
{
    '$lookup';
    {
        'from';
        'templateexperiencesections',
            'localField';
        'sectionThree',
            'foreignField';
        '_id',
            'as';
        'sectionThree',
            'pipeline';
        [
            {
                '$match': {
                    'isActive': true,
                    'isDeleted': false
                }
            }, {
                '$project': {
                    'isActive': 0,
                    'isDeleted': 0,
                    'createdAt': 0,
                    'updatedAt': 0
                }
            }, {
                '$lookup': {
                    'from': 'templatetexts',
                    'localField': 'text',
                    'foreignField': '_id',
                    'as': 'text',
                    'pipeline': [
                        {
                            '$match': {
                                'isActive': true,
                                'isDeleted': false
                            }
                        }, {
                            '$project': {
                                'isActive': 0,
                                'isDeleted': 0,
                                'createdAt': 0,
                                'updatedAt': 0
                            }
                        }, {
                            '$lookup': {
                                'from': 'templatetexts',
                                'localField': 'subHeading',
                                'foreignField': '_id',
                                'as': 'subHeading',
                                'pipeline': [
                                    {
                                        '$match': {
                                            'isActive': true,
                                            'isDeleted': false
                                        }
                                    }, {
                                        '$project': {
                                            'isActive': 0,
                                            'isDeleted': 0,
                                            'createdAt': 0,
                                            'updatedAt': 0
                                        }
                                    }, {
                                        '$project': {
                                            '_id': 1,
                                            'text': 1
                                        }
                                    }
                                ]
                            }
                        }, {
                            '$unwind': {
                                'path': '$subHeading'
                            }
                        }, {
                            '$project': {
                                '_id': 1,
                                'subHeading': 1,
                                'text': 1
                            }
                        }, {
                            '$addFields': {
                                'subHeading': '$subHeading.text'
                            }
                        }
                    ]
                }
            }, {
                '$unwind': {
                    'path': '$text'
                }
            }, {
                '$addFields': {
                    'subHeading': '$text.subHeading',
                    'text': '$text.text'
                }
            }
        ];
    }
}
{
    '$unwind';
    {
        'path';
        '$sectionThree';
    }
}
{
    '$lookup';
    {
        'from';
        'templategrowthsections',
            'localField';
        'sectionFour',
            'foreignField';
        '_id',
            'as';
        'sectionFour',
            'pipeline';
        [
            {
                '$match': {
                    'isActive': true,
                    'isDeleted': false
                }
            }, {
                '$project': {
                    'isActive': 0,
                    'isDeleted': 0,
                    'createdAt': 0,
                    'updatedAt': 0
                }
            }, {
                '$lookup': {
                    'from': 'templatetexts',
                    'localField': 'text',
                    'foreignField': '_id',
                    'as': 'text',
                    'pipeline': [
                        {
                            '$match': {
                                'isActive': true,
                                'isDeleted': false
                            }
                        }, {
                            '$project': {
                                'isActive': 0,
                                'isDeleted': 0,
                                'createdAt': 0,
                                'updatedAt': 0
                            }
                        }, {
                            '$lookup': {
                                'from': 'templatetexts',
                                'localField': 'subHeading',
                                'foreignField': '_id',
                                'as': 'subHeading',
                                'pipeline': [
                                    {
                                        '$match': {
                                            'isActive': true,
                                            'isDeleted': false
                                        }
                                    }, {
                                        '$project': {
                                            'isActive': 0,
                                            'isDeleted': 0,
                                            'createdAt': 0,
                                            'updatedAt': 0
                                        }
                                    }, {
                                        '$project': {
                                            '_id': 1,
                                            'text': 1
                                        }
                                    }
                                ]
                            }
                        }, {
                            '$unwind': {
                                'path': '$subHeading'
                            }
                        }, {
                            '$project': {
                                '_id': 1,
                                'subHeading': 1,
                                'text': 1
                            }
                        }, {
                            '$addFields': {
                                'subHeading': '$subHeading.text'
                            }
                        }
                    ]
                }
            }, {
                '$unwind': {
                    'path': '$text'
                }
            }, {
                '$addFields': {
                    'subHeading': '$text.subHeading',
                    'text': '$text.text'
                }
            }
        ];
    }
}
{
    '$unwind';
    {
        'path';
        '$sectionFour';
    }
}
{
    '$lookup';
    {
        'from';
        'templateaboutsections',
            'localField';
        'sectionFive',
            'foreignField';
        '_id',
            'as';
        'sectionFive',
            'pipeline';
        [
            {
                '$match': {
                    'isActive': true,
                    'isDeleted': false
                }
            }, {
                '$project': {
                    'isActive': 0,
                    'isDeleted': 0,
                    'createdAt': 0,
                    'updatedAt': 0
                }
            }, {
                '$lookup': {
                    'from': 'templatecardsections',
                    'localField': 'cards',
                    'foreignField': '_id',
                    'as': 'cards',
                    'pipeline': [
                        {
                            '$match': {
                                'isActive': true,
                                'isDeleted': false
                            }
                        }, {
                            '$project': {
                                'isActive': 0,
                                'isDeleted': 0,
                                'createdAt': 0,
                                'updatedAt': 0
                            }
                        }, {
                            '$lookup': {
                                'from': 'templatetexts',
                                'localField': 'text',
                                'foreignField': '_id',
                                'as': 'text',
                                'pipeline': [
                                    {
                                        '$match': {
                                            'isActive': true,
                                            'isDeleted': false
                                        }
                                    }, {
                                        '$project': {
                                            'isActive': 0,
                                            'isDeleted': 0,
                                            'createdAt': 0,
                                            'updatedAt': 0
                                        }
                                    }, {
                                        '$lookup': {
                                            'from': 'templatetexts',
                                            'localField': 'subHeading',
                                            'foreignField': '_id',
                                            'as': 'subHeading',
                                            'pipeline': [
                                                {
                                                    '$match': {
                                                        'isActive': true,
                                                        'isDeleted': false
                                                    }
                                                }, {
                                                    '$project': {
                                                        'isActive': 0,
                                                        'isDeleted': 0,
                                                        'createdAt': 0,
                                                        'updatedAt': 0
                                                    }
                                                }, {
                                                    '$project': {
                                                        '_id': 1,
                                                        'text': 1
                                                    }
                                                }
                                            ]
                                        }
                                    }, {
                                        '$unwind': {
                                            'path': '$subHeading'
                                        }
                                    }, {
                                        '$project': {
                                            '_id': 1,
                                            'subHeading': 1,
                                            'text': 1
                                        }
                                    }, {
                                        '$addFields': {
                                            'subHeading': '$subHeading.text'
                                        }
                                    }
                                ]
                            }
                        }, {
                            '$unwind': {
                                'path': '$text'
                            }
                        }, {
                            '$addFields': {
                                'subHeading': '$text.subHeading',
                                'text': '$text.text'
                            }
                        }
                    ]
                }
            }, {
                '$lookup': {
                    'from': 'templatetexts',
                    'localField': 'text',
                    'foreignField': '_id',
                    'as': 'text',
                    'pipeline': [
                        {
                            '$match': {
                                'isActive': true,
                                'isDeleted': false
                            }
                        }, {
                            '$project': {
                                'isActive': 0,
                                'isDeleted': 0,
                                'createdAt': 0,
                                'updatedAt': 0
                            }
                        }, {
                            '$lookup': {
                                'from': 'templatetexts',
                                'localField': 'subHeading',
                                'foreignField': '_id',
                                'as': 'subHeading',
                                'pipeline': [
                                    {
                                        '$match': {
                                            'isActive': true,
                                            'isDeleted': false
                                        }
                                    }, {
                                        '$project': {
                                            'isActive': 0,
                                            'isDeleted': 0,
                                            'createdAt': 0,
                                            'updatedAt': 0
                                        }
                                    }, {
                                        '$project': {
                                            '_id': 1,
                                            'text': 1
                                        }
                                    }
                                ]
                            }
                        }, {
                            '$unwind': {
                                'path': '$subHeading'
                            }
                        }, {
                            '$project': {
                                '_id': 1,
                                'subHeading': 1,
                                'text': 1
                            }
                        }, {
                            '$addFields': {
                                'subHeading': '$subHeading.text'
                            }
                        }
                    ]
                }
            }, {
                '$unwind': {
                    'path': '$text'
                }
            }, {
                '$addFields': {
                    'subHeading': '$text.subHeading',
                    'text': '$text.text'
                }
            }
        ];
    }
}
{
    '$unwind';
    {
        'path';
        '$sectionFive';
    }
}
{
    '$lookup';
    {
        'from';
        'users',
            'localField';
        'dietitian',
            'foreignField';
        '_id',
            'as';
        'dietitian',
            'pipeline';
        [
            {
                '$match': {
                    'isActive': true,
                    'isDeleted': false
                }
            }, {
                '$lookup': {
                    'from': 'roles',
                    'localField': 'role',
                    'foreignField': '_id',
                    'as': 'role',
                    'pipeline': [
                        {
                            '$match': {
                                'isActive': true,
                                'isDeleted': false
                            }
                        }
                    ]
                }
            }, {
                '$unwind': {
                    'path': '$role'
                }
            }, {
                '$addFields': {
                    'role': '$role.name'
                }
            }, {
                '$project': {
                    'password': 0,
                    'isActive': 0,
                    'isDeleted': 0,
                    'createdAt': 0,
                    'updatedAt': 0
                }
            }
        ];
    }
}
{
    '$unwind';
    {
        'path';
        '$dietitian';
    }
}
";
